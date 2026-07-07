import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type ClientStatus = "Prospect" | "Active" | "Delivered" | "On Hold";
type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";
type ContentStatus = "Raw Footage" | "In Edit" | "Review" | "Delivered";
type EnquiryStatus = "New" | "Contacted" | "Qualified" | "Closed";

interface Client {
  id: string; name: string; service: string; status: ClientStatus;
  start_date: string; value: string; notes: string;
  log: { id: string; text: string; ts: string }[];
}
interface Task {
  id: string; title: string; client: string; priority: TaskPriority;
  status: TaskStatus; due_date: string; assignee: "David" | "PJ" | "Both";
}
interface ContentItem {
  id: string; title: string; client: string; type: string;
  status: ContentStatus; due_date: string; notes: string;
}
interface Enquiry {
  id: string; name: string; email: string; phone: string; social: string;
  project: string; created_at: string; status: EnquiryStatus; tally_id?: string;
}

// ─── Tally ────────────────────────────────────────────────────────────────────
const TALLY_KEY = "tly-KYMq88OTmI0tYcS2iBKXwcARisCCNlCs";
const TALLY_FORM_ID = "PdgPKP";
const Q = { firstName: "GLg6lo", lastName: "OLgaG8", phone: "VVdGJv", email: "PlgpOb", social: "ELgKWN", project: "rVp5Pv" };

// ─── Colour palette ───────────────────────────────────────────────────────────
const PALETTE = {
  bg: "#09090f", surface: "#111118", surfaceHover: "#16161f",
  border: "rgba(255,255,255,0.07)", borderStrong: "rgba(255,255,255,0.12)",
  text: "#f0f0f5", muted: "rgba(240,240,245,0.4)", faint: "rgba(240,240,245,0.18)",
  accent: "#5b6ef5", accentGlow: "rgba(91,110,245,0.18)",
  green: "#34d399", amber: "#fbbf24", red: "#f87171", purple: "#a78bfa", blue: "#60a5fa",
};
const SC: Record<string, string> = {
  Prospect: PALETTE.blue, Active: PALETTE.green, Delivered: PALETTE.purple, "On Hold": PALETTE.amber,
  "To Do": PALETTE.blue, "In Progress": PALETTE.amber, Done: PALETTE.green,
  "Raw Footage": PALETTE.blue, "In Edit": PALETTE.amber, Review: "#fb923c",
  New: PALETTE.blue, Contacted: PALETTE.amber, Qualified: PALETTE.green, Closed: "rgba(240,240,245,0.25)",
};
const PC: Record<string, string> = { High: PALETTE.red, Medium: PALETTE.amber, Low: PALETTE.green };
const TASK_CYCLE: TaskStatus[] = ["To Do", "In Progress", "Done"];
const CONTENT_CYCLE: ContentStatus[] = ["Raw Footage", "In Edit", "Review", "Delivered"];
const ENQ_CYCLE: EnquiryStatus[] = ["New", "Contacted", "Qualified", "Closed"];

function cycleNext<T>(arr: T[], current: T): T { return arr[(arr.indexOf(current) + 1) % arr.length]; }
function isOverdue(dueDate: string, done: boolean): boolean {
  if (done || !dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}
function uid() { return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 18); }

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => { const h = () => setM(window.innerWidth < 640); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return m;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const iStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${PALETTE.border}`,
  borderRadius: "10px", padding: "10px 12px", fontSize: "14px", color: PALETTE.text,
  outline: "none", marginBottom: "14px", fontFamily: "inherit", transition: "border-color 0.15s",
};
const lStyle: React.CSSProperties = {
  fontSize: "11px", color: PALETTE.muted, letterSpacing: "0.07em",
  textTransform: "uppercase", marginBottom: "5px", display: "block", fontWeight: 500,
};
const sBtn: React.CSSProperties = {
  width: "100%", padding: "12px", borderRadius: "10px", border: "none",
  background: `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`,
  color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "4px",
  boxShadow: `0 4px 20px ${PALETTE.accentGlow}`,
};
const div5: React.CSSProperties = { borderBottom: `1px solid ${PALETTE.border}`, paddingBottom: "12px", marginBottom: "12px" };

// ─── UI Primitives ────────────────────────────────────────────────────────────
function Pill({ label, colour, onClick }: { label: string; colour: string; onClick?: () => void }) {
  return (
    <span onClick={onClick} title={onClick ? "Tap to advance" : undefined} style={{
      display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px",
      borderRadius: "999px", fontSize: "11px", fontWeight: 600,
      background: colour + "18", color: colour, border: `1px solid ${colour}30`,
      whiteSpace: "nowrap", cursor: onClick ? "pointer" : "default", userSelect: "none",
    }}>
      {label}{onClick && <span style={{ opacity: 0.6, fontSize: "10px" }}>↻</span>}
    </span>
  );
}
function Glass({ children, style, overdue }: { children: React.ReactNode; style?: React.CSSProperties; overdue?: boolean }) {
  return (
    <div style={{ background: overdue ? "rgba(248,113,113,0.05)" : PALETTE.surface, border: `1px solid ${overdue ? "rgba(248,113,113,0.2)" : PALETTE.border}`, borderRadius: "16px", backdropFilter: "blur(12px)", ...style }}>
      {children}
    </div>
  );
}
function StatCard({ label, value, colour, sub }: { label: string; value: string; colour: string; sub?: string }) {
  return (
    <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: "16px", padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${colour}, transparent)` }} />
      <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: PALETTE.muted, marginBottom: "10px" }}>{label}</div>
      <div style={{ fontSize: "30px", fontWeight: 700, color: colour, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: PALETTE.faint, marginTop: "5px" }}>{sub}</div>}
    </div>
  );
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.faint, marginBottom: "14px" }}>{children}</div>;
}
function PrimaryBtn({ onClick, children, loading, small }: { onClick: () => void; children: React.ReactNode; loading?: boolean; small?: boolean }) {
  return (
    <button onClick={onClick} disabled={loading} style={{ padding: small ? "7px 14px" : "9px 18px", borderRadius: "10px", border: "none", background: loading ? `${PALETTE.accent}60` : `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`, color: "#fff", fontSize: small ? "12px" : "13px", fontWeight: 600, cursor: loading ? "default" : "pointer", whiteSpace: "nowrap", boxShadow: loading ? "none" : `0 2px 12px ${PALETTE.accentGlow}` }}>
      {loading ? "Syncing…" : children}
    </button>
  );
}
function GhostBtn({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${danger ? "rgba(248,113,113,0.25)" : PALETTE.border}`, background: "transparent", color: danger ? PALETTE.red : PALETTE.muted, fontSize: "12px", cursor: "pointer", fontWeight: 500 }}>
      {children}
    </button>
  );
}
function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `2px solid ${PALETTE.border}`, borderTopColor: PALETTE.accent, animation: "er-spin 0.8s linear infinite" }} />
      <style>{`@keyframes er-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Gate ─────────────────────────────────────────────────────────────────────
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState(""); const [err, setErr] = useState(false);
  const go = () => {
    if (v === "earnedreach2025") { sessionStorage.setItem("er_dash_auth", "1"); onUnlock(); }
    else { setErr(true); setTimeout(() => setErr(false), 1000); }
  };
  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", margin: "0 auto 20px", background: `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`, boxShadow: `0 8px 32px ${PALETTE.accentGlow}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/er-logo.png" alt="ER" style={{ width: "28px" }} />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: PALETTE.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Studio Dashboard</h1>
          <p style={{ fontSize: "13px", color: PALETTE.muted, margin: 0 }}>EarnedReach internal access only</p>
        </div>
        <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: "18px", padding: "24px" }}>
          <input type="password" placeholder="Enter password" value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} style={{ ...iStyle, marginBottom: err ? "8px" : "14px", borderColor: err ? PALETTE.red : undefined }} autoFocus />
          {err && <p style={{ color: PALETTE.red, fontSize: "12px", margin: "0 0 12px" }}>Incorrect password</p>}
          <button onClick={go} style={sBtn}>Enter</button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.borderStrong}`, borderRadius: "22px 22px 0 0", padding: "24px 22px 40px", width: "100%", maxWidth: "520px", maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: PALETTE.border, margin: "0 auto 22px" }} />
        {children}
      </div>
    </div>
  );
}

// ─── Forms ────────────────────────────────────────────────────────────────────
function ClientForm({ initial, onSave, onClose }: { initial?: Client; onSave: (c: Client) => void; onClose: () => void }) {
  const [f, setF] = useState<Client>(initial || { id: uid(), name: "", service: "", status: "Prospect", start_date: "", value: "", notes: "", log: [] });
  const u = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Client" : "New Client"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Client name" />
    <label style={lStyle}>Service</label><input style={iStyle} value={f.service} onChange={u("service")} placeholder="e.g. YouTube Series" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Prospect","Active","Delivered","On Hold"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Start Date</label><input style={iStyle} type="date" value={f.start_date} onChange={u("start_date")} />
    <label style={lStyle}>Value</label><input style={iStyle} value={f.value} onChange={u("value")} placeholder="e.g. £1,800/mo" />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}
function TaskForm({ initial, clients, onSave, onClose }: { initial?: Task; clients: Client[]; onSave: (t: Task) => void; onClose: () => void }) {
  const [f, setF] = useState<Task>(initial || { id: uid(), title: "", client: clients[0]?.name || "", priority: "Medium", status: "To Do", due_date: "", assignee: "David" });
  const u = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Task" : "New Task"}</h3>
    <label style={lStyle}>Title</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="Task title" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}<option value="Internal">Internal</option></select>
    <label style={lStyle}>Priority</label><select style={iStyle} value={f.priority} onChange={u("priority")}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select>
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["To Do","In Progress","Done"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.due_date} onChange={u("due_date")} />
    <label style={lStyle}>Assignee</label><select style={iStyle} value={f.assignee} onChange={u("assignee")}>{["David","PJ","Both"].map(a=><option key={a}>{a}</option>)}</select>
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}
function ContentForm({ initial, clients, onSave, onClose }: { initial?: ContentItem; clients: Client[]; onSave: (c: ContentItem) => void; onClose: () => void }) {
  const [f, setF] = useState<ContentItem>(initial || { id: uid(), title: "", client: clients[0]?.name || "", type: "", status: "Raw Footage", due_date: "", notes: "" });
  const u = (k: keyof ContentItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Content" : "New Content Item"}</h3>
    <label style={lStyle}>Title</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="e.g. EP3 Full Cut" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select>
    <label style={lStyle}>Type</label><input style={iStyle} value={f.type} onChange={u("type")} placeholder="e.g. YouTube Episode" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Raw Footage","In Edit","Review","Delivered"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.due_date} onChange={u("due_date")} />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}
function EnquiryForm({ initial, onSave, onClose }: { initial?: Enquiry; onSave: (e: Enquiry) => void; onClose: () => void }) {
  const [f, setF] = useState<Enquiry>(initial || { id: uid(), name: "", email: "", phone: "", social: "", project: "", created_at: new Date().toISOString(), status: "New" });
  const u = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Enquiry" : "New Enquiry"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Full name" />
    <label style={lStyle}>Email</label><input style={iStyle} value={f.email} onChange={u("email")} placeholder="email@example.com" />
    <label style={lStyle}>Phone</label><input style={iStyle} value={f.phone} onChange={u("phone")} placeholder="+44..." />
    <label style={lStyle}>Social</label><input style={iStyle} value={f.social} onChange={u("social")} placeholder="@handle" />
    <label style={lStyle}>Project Brief</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.project} onChange={u("project")} />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["New","Contacted","Qualified","Closed"].map(s=><option key={s}>{s}</option>)}</select>
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}
function ClientLog({ client, onUpdate, onClose }: { client: Client; onUpdate: (c: Client) => void; onClose: () => void }) {
  const [note, setNote] = useState("");
  const addNote = () => {
    if (!note.trim()) return;
    const entry = { id: uid(), text: note.trim(), ts: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) };
    onUpdate({ ...client, log: [entry, ...client.log] });
    setNote("");
  };
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 4px", color: PALETTE.text }}>{client.name}</h3>
    <p style={{ fontSize: "12px", color: PALETTE.muted, margin: "0 0 20px" }}>Activity log</p>
    <textarea value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); } }} placeholder="Add a note… (Enter to save)" style={{ ...iStyle, minHeight: "72px", resize: "vertical", marginBottom: "8px" }} />
    <button style={sBtn} onClick={addNote}>Add Note</button>
    <div style={{ marginTop: "20px" }}>
      {client.log.length === 0 ? <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No notes yet</p>
        : client.log.map(entry => (
          <div key={entry.id} style={{ ...div5, display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <div style={{ fontSize: "13px", color: PALETTE.text, lineHeight: 1.55, flex: 1 }}>{entry.text}</div>
            <div style={{ fontSize: "11px", color: PALETTE.faint, flexShrink: 0, marginTop: "2px" }}>{entry.ts}</div>
          </div>
        ))}
    </div>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "14px", color: PALETTE.muted }} onClick={onClose}>Close</button>
  </div>;
}

// ─── Strategy Generator ─────────────────────────────────────────────────────
const STRATEGY_FIELDS = [
  { key: "industry", label: "Industry / Niche", placeholder: "e.g. Padel sports club, West Midlands" },
  { key: "targetAudience", label: "Target Audience", placeholder: "e.g. 25-45 active adults in Birmingham area" },
  { key: "currentFollowers", label: "Current Social Following", placeholder: "e.g. 232 followers on Instagram" },
  { key: "mainGoal", label: "Primary Goal", placeholder: "e.g. Grow Instagram, drive court bookings" },
  { key: "tone", label: "Desired Tone / Style", placeholder: "e.g. Energetic, cinematic, community-first" },
  { key: "competitors", label: "Competitors or Brands They Admire", placeholder: "e.g. Padel Zoco, local tennis clubs" },
  { key: "upcomingEvents", label: "Upcoming Events or Launches", placeholder: "e.g. Summer tournament in August" },
  { key: "contentConstraints", label: "Content Constraints", placeholder: "e.g. No staff on camera, limited budget" },
  { key: "usp", label: "Unique Selling Point", placeholder: "e.g. Only padel club in Dudley with 4 courts" },
  { key: "monthlyBudget", label: "Monthly Content Budget", placeholder: "e.g. £700/month" },
] as const;

type StrategyField = typeof STRATEGY_FIELDS[number]["key"];
type StrategyInputs = Partial<Record<StrategyField, string>>;

function StrategyGenerator({ client, onClose }: { client: Client; onClose: () => void }) {
  const [inputs, setInputs] = useState<StrategyInputs>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: client.name, ...inputs }),
      });
      const data = await res.json() as { strategy?: string; error?: string };
      if (!res.ok || data.error) { setError(data.error || "Generation failed"); }
      else { setResult(data.strategy || ""); }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  // Simple markdown renderer (bold, headings, lists)
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("### ")) return <h4 key={i} style={{ fontSize: "14px", fontWeight: 700, color: PALETTE.accent, margin: "18px 0 6px", letterSpacing: "-0.01em" }}>{line.slice(4)}</h4>;
      if (line.startsWith("## ")) return <h3 key={i} style={{ fontSize: "16px", fontWeight: 700, color: PALETTE.text, margin: "22px 0 8px", letterSpacing: "-0.02em" }}>{line.slice(3)}</h3>;
      if (line.startsWith("# ")) return <h2 key={i} style={{ fontSize: "18px", fontWeight: 700, color: PALETTE.text, margin: "0 0 16px", letterSpacing: "-0.02em" }}>{line.slice(2)}</h2>;
      if (line.startsWith("- ") || line.startsWith("* ")) return <div key={i} style={{ fontSize: "13px", color: PALETTE.text, lineHeight: 1.6, paddingLeft: "16px", marginBottom: "4px", position: "relative" }}><span style={{ position: "absolute", left: 0, color: PALETTE.accent }}>·</span>{line.slice(2)}</div>;
      if (line.startsWith("|")) return <div key={i} style={{ fontSize: "12px", color: PALETTE.muted, fontFamily: "monospace", lineHeight: 1.8, borderBottom: `1px solid ${PALETTE.border}`, padding: "4px 0" }}>{line}</div>;
      if (line.trim() === "" || line.startsWith("---")) return <div key={i} style={{ height: "8px" }} />;
      // Handle **bold**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return <p key={i} style={{ fontSize: "13px", color: PALETTE.muted, lineHeight: 1.7, margin: "0 0 6px" }}>{parts.map((p, j) => p.startsWith("**") ? <strong key={j} style={{ color: PALETTE.text, fontWeight: 600 }}>{p.slice(2, -2)}</strong> : p)}</p>;
    });
  };

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "4px" }}>
      <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 4px", color: PALETTE.text }}>Content Strategy</h3>
      <p style={{ fontSize: "12px", color: PALETTE.muted, margin: "0 0 20px" }}>{client.name} — AI-generated brief</p>

      {!result && (
        <>
          {STRATEGY_FIELDS.map(f => (
            <div key={f.key}>
              <label style={lStyle}>{f.label}</label>
              <input
                style={iStyle}
                placeholder={f.placeholder}
                value={inputs[f.key] || ""}
                onChange={e => setInputs(prev => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          {error && <p style={{ color: PALETTE.red, fontSize: "13px", marginBottom: "12px", padding: "10px", background: "rgba(248,113,113,0.08)", borderRadius: "8px", border: `1px solid rgba(248,113,113,0.2)` }}>{error}</p>}
          <button
            style={{ ...sBtn, opacity: loading ? 0.7 : 1 }}
            onClick={generate}
            disabled={loading}
          >
            {loading ? "Generating strategy…" : "✦ Generate Strategy"}
          </button>
        </>
      )}

      {result && (
        <>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${PALETTE.border}`, borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            {renderMarkdown(result)}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{ ...sBtn, flex: 1, marginTop: 0 }} onClick={copyToClipboard}>Copy to Clipboard</button>
            <button style={{ ...sBtn, flex: 1, marginTop: 0, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", color: PALETTE.muted }} onClick={() => setResult(null)}>Regenerate</button>
          </div>
        </>
      )}

      <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "14px", color: PALETTE.muted }} onClick={onClose}>Close</button>
    </div>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = "overview" | "clients" | "tasks" | "content" | "enquiries";
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "clients", label: "Clients", icon: "◉" },
  { id: "tasks", label: "Tasks", icon: "◻" },
  { id: "content", label: "Content", icon: "▷" },
  { id: "enquiries", label: "Enquiries", icon: "◎" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("er_dash_auth") === "1");
  const [tab, setTab] = useState<Tab>("overview");
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  type MS =
    | { type: "client"; data?: Client }
    | { type: "task"; data?: Task }
    | { type: "content"; data?: ContentItem }
    | { type: "enquiry"; data?: Enquiry }
    | { type: "log"; data: Client }
    | { type: "strategy"; data: Client }
    | null;
  const [modal, setModal] = useState<MS>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [{ data: cl }, { data: ta }, { data: co }, { data: en }] = await Promise.all([
      supabase.from("clients").select("*").order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").order("created_at", { ascending: false }),
      supabase.from("content").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
    ]);
    if (cl) setClients(cl.map((r: Record<string, unknown>) => ({ ...r, log: (r.log as { id: string; text: string; ts: string }[]) || [], start_date: (r.start_date as string) || "" } as Client)));
    if (ta) setTasks(ta as Task[]);
    if (co) setContent(co.map((r: Record<string, unknown>) => ({ ...r, due_date: (r.due_date as string) || "" } as ContentItem)));
    if (en) setEnquiries(en as Enquiry[]);
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) loadData(); }, [authed, loadData]);

  useEffect(() => {
    const el = navRef.current?.querySelector("[data-active='true']") as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [tab]);

  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />;

  // ── CRUD ──
  const saveClient = async (c: Client) => {
    await supabase.from("clients").upsert({ id: c.id, name: c.name, service: c.service, status: c.status, start_date: c.start_date || null, value: c.value, notes: c.notes, log: c.log });
    setClients(p => p.some(x => x.id === c.id) ? p.map(x => x.id === c.id ? c : x) : [c, ...p]);
    setModal(null);
  };
  const deleteClient = async (id: string) => { await supabase.from("clients").delete().eq("id", id); setClients(p => p.filter(x => x.id !== id)); };
  const saveTask = async (t: Task) => {
    await supabase.from("tasks").upsert({ id: t.id, title: t.title, client: t.client, priority: t.priority, status: t.status, due_date: t.due_date || null, assignee: t.assignee });
    setTasks(p => p.some(x => x.id === t.id) ? p.map(x => x.id === t.id ? t : x) : [t, ...p]);
    setModal(null);
  };
  const deleteTask = async (id: string) => { await supabase.from("tasks").delete().eq("id", id); setTasks(p => p.filter(x => x.id !== id)); };
  const cycleTaskStatus = async (t: Task) => {
    const next = { ...t, status: cycleNext(TASK_CYCLE, t.status) };
    await supabase.from("tasks").update({ status: next.status }).eq("id", t.id);
    setTasks(p => p.map(x => x.id === t.id ? next : x));
  };
  const saveContent = async (c: ContentItem) => {
    await supabase.from("content").upsert({ id: c.id, title: c.title, client: c.client, type: c.type, status: c.status, due_date: c.due_date || null, notes: c.notes });
    setContent(p => p.some(x => x.id === c.id) ? p.map(x => x.id === c.id ? c : x) : [c, ...p]);
    setModal(null);
  };
  const deleteContent = async (id: string) => { await supabase.from("content").delete().eq("id", id); setContent(p => p.filter(x => x.id !== id)); };
  const cycleContentStatus = async (c: ContentItem) => {
    const next = { ...c, status: cycleNext(CONTENT_CYCLE, c.status) };
    await supabase.from("content").update({ status: next.status }).eq("id", c.id);
    setContent(p => p.map(x => x.id === c.id ? next : x));
  };
  const saveEnquiry = async (e: Enquiry) => {
    await supabase.from("enquiries").upsert({ id: e.id, name: e.name, email: e.email, phone: e.phone, social: e.social, project: e.project, status: e.status, tally_id: e.tally_id });
    setEnquiries(p => p.some(x => x.id === e.id) ? p.map(x => x.id === e.id ? e : x) : [e, ...p]);
    setModal(null);
  };
  const deleteEnquiry = async (id: string) => { await supabase.from("enquiries").delete().eq("id", id); setEnquiries(p => p.filter(x => x.id !== id)); };
  const cycleEnqStatus = async (e: Enquiry) => {
    const next = { ...e, status: cycleNext(ENQ_CYCLE, e.status) };
    await supabase.from("enquiries").update({ status: next.status }).eq("id", e.id);
    setEnquiries(p => p.map(x => x.id === e.id ? next : x));
  };
  const updateClientLog = async (c: Client) => {
    await supabase.from("clients").update({ log: c.log }).eq("id", c.id);
    setClients(p => p.map(x => x.id === c.id ? c : x));
    setModal({ type: "log", data: c });
  };

  // ── Tally sync ──
  const syncTally = async () => {
    setSyncing(true); setSyncMsg("");
    try {
      const res = await fetch(`https://api.tally.so/forms/${TALLY_FORM_ID}/submissions?limit=100`, { headers: { Authorization: `Bearer ${TALLY_KEY}` } });
      const data = await res.json();
      const subs: { id: string; submittedAt: string; responses: { questionId: string; answer: string }[] }[] = data.submissions || [];
      const { data: existing } = await supabase.from("enquiries").select("tally_id").not("tally_id", "is", null);
      const existingIds = new Set((existing || []).map((r: { tally_id: string }) => r.tally_id));
      const newOnes = subs.filter(s => !existingIds.has(s.id));
      if (!newOnes.length) { setSyncMsg("Already up to date"); setSyncing(false); return; }
      const get = (s: typeof subs[0], qId: string) => s.responses.find(r => r.questionId === qId)?.answer || "";
      const toAdd = newOnes.map(s => ({ id: uid(), tally_id: s.id, name: `${get(s, Q.firstName)} ${get(s, Q.lastName)}`.trim(), email: get(s, Q.email), phone: get(s, Q.phone), social: get(s, Q.social), project: get(s, Q.project), status: "New" as EnquiryStatus }));
      await supabase.from("enquiries").insert(toAdd);
      setEnquiries(prev => [...toAdd.map(e => ({ ...e, created_at: new Date().toISOString() })), ...prev]);
      setSyncMsg(`${toAdd.length} new enquir${toAdd.length === 1 ? "y" : "ies"} synced`);
    } catch { setSyncMsg("Sync failed"); }
    setSyncing(false);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const aC = clients.filter(c => c.status === "Active").length;
  const pT = tasks.filter(t => t.status !== "Done").length;
  const iC = content.filter(c => c.status !== "Delivered").length;
  const nE = enquiries.filter(e => e.status === "New").length;

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, color: PALETTE.text, fontFamily: "'Inter',system-ui,sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${PALETTE.border}`, position: "sticky", top: 0, background: PALETTE.bg, zIndex: 100, backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "14px 18px 0" : "16px 36px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/er-logo.png" alt="ER" style={{ width: "16px" }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>EarnedReach Studio</span>
          </div>
          <a href="/" style={{ fontSize: "12px", color: PALETTE.faint, textDecoration: "none", fontWeight: 500 }}>← Back to site</a>
        </div>
        <div ref={navRef} style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: isMobile ? "10px 14px 0" : "10px 32px 0", gap: "2px" }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} data-active={active} onClick={() => setTab(t.id)} style={{ padding: "8px 16px", borderRadius: "10px 10px 0 0", border: "none", background: active ? PALETTE.surface : "transparent", color: active ? PALETTE.text : PALETTE.muted, fontSize: "13px", fontWeight: active ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, borderBottom: active ? `2px solid ${PALETTE.accent}` : "2px solid transparent", transition: "all 0.15s" }}>
                {t.icon} {t.label}
                {t.id === "enquiries" && nE > 0 && <span style={{ marginLeft: "6px", background: PALETTE.purple + "30", color: PALETTE.purple, borderRadius: "999px", padding: "1px 6px", fontSize: "10px", fontWeight: 700 }}>{nE}</span>}
                {t.id === "tasks" && pT > 0 && <span style={{ marginLeft: "6px", background: PALETTE.amber + "30", color: PALETTE.amber, borderRadius: "999px", padding: "1px 6px", fontSize: "10px", fontWeight: 700 }}>{pT}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "20px 16px" : "28px 36px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", gap: "8px" }}>
          {tab === "clients" && <PrimaryBtn onClick={() => setModal({ type: "client" })} small>+ New Client</PrimaryBtn>}
          {tab === "tasks" && <PrimaryBtn onClick={() => setModal({ type: "task" })} small>+ New Task</PrimaryBtn>}
          {tab === "content" && <PrimaryBtn onClick={() => setModal({ type: "content" })} small>+ New Item</PrimaryBtn>}
          {tab === "enquiries" && <>
            <PrimaryBtn onClick={syncTally} loading={syncing} small>↻ Sync Tally</PrimaryBtn>
            <PrimaryBtn onClick={() => setModal({ type: "enquiry" })} small>+ Add</PrimaryBtn>
          </>}
        </div>

        {loading ? <Spinner /> : <>
          {/* OVERVIEW */}
          {tab === "overview" && <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
              <StatCard label="Active Clients" value={String(aC)} colour={PALETTE.green} />
              <StatCard label="Outstanding Tasks" value={String(pT)} colour={PALETTE.amber} />
              <StatCard label="In Progress" value={String(iC)} colour={PALETTE.blue} sub="content items" />
              <StatCard label="New Enquiries" value={String(nE)} colour={PALETTE.purple} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
              <Glass style={{ padding: "20px" }}>
                <SectionLabel>Outstanding Tasks</SectionLabel>
                {tasks.filter(t => t.status !== "Done").length === 0 ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>All clear</p>
                  : tasks.filter(t => t.status !== "Done").slice(0, 5).map((task, i, a) => {
                    const od = isOverdue(task.due_date, false);
                    return <div key={task.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: od ? PALETTE.red : PALETTE.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{od ? "⚠ " : ""}{task.title}</div>
                          <div style={{ fontSize: "11px", color: PALETTE.muted, marginTop: "3px" }}>{task.client} · {task.due_date}</div>
                        </div>
                        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}><Pill label={task.priority} colour={PC[task.priority]} /><Pill label={task.assignee} colour={PALETTE.blue} /></div>
                      </div>
                    </div>;
                  })}
              </Glass>
              <Glass style={{ padding: "20px" }}>
                <SectionLabel>Content In Progress</SectionLabel>
                {content.filter(c => c.status !== "Delivered").length === 0 ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>Nothing in progress</p>
                  : content.filter(c => c.status !== "Delivered").map((item, i, a) => (
                    <div key={item.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                          <div style={{ fontSize: "11px", color: PALETTE.muted, marginTop: "3px" }}>{item.client} · {item.type}</div>
                        </div>
                        <Pill label={item.status} colour={SC[item.status] || PALETTE.blue} />
                      </div>
                    </div>
                  ))}
              </Glass>
              <Glass style={{ padding: "20px" }}>
                <SectionLabel>Active Clients</SectionLabel>
                {clients.filter(c => c.status === "Active").length === 0 ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>No active clients</p>
                  : clients.filter(c => c.status === "Active").map((client, i, a) => (
                    <div key={client.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                        <div><div style={{ fontSize: "13px", fontWeight: 500 }}>{client.name}</div><div style={{ fontSize: "11px", color: PALETTE.muted, marginTop: "3px" }}>{client.service}</div></div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: PALETTE.green }}>{client.value}</div>
                      </div>
                    </div>
                  ))}
              </Glass>
              <Glass style={{ padding: "20px" }}>
                <SectionLabel>New Enquiries</SectionLabel>
                {enquiries.filter(e => e.status === "New").length === 0 ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>No new enquiries</p>
                  : enquiries.filter(e => e.status === "New").map((enq, i, a) => (
                    <div key={enq.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 500 }}>{enq.name}</div>
                        <div style={{ fontSize: "11px", color: PALETTE.faint }}>{enq.created_at?.split("T")[0]}</div>
                      </div>
                      <div style={{ fontSize: "12px", color: PALETTE.muted, marginBottom: "2px" }}>{enq.email}</div>
                      <div style={{ fontSize: "12px", color: PALETTE.faint, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{enq.project}</div>
                    </div>
                  ))}
              </Glass>
            </div>
          </>}

          {/* CLIENTS */}
          {tab === "clients" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {clients.length === 0 && <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No clients yet.</p>}
              {clients.map(c => (
                <Glass key={c.id} style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: c.notes || c.log.length ? "10px" : "12px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>{c.name}</span>
                        <Pill label={c.status} colour={SC[c.status]} />
                      </div>
                      <div style={{ fontSize: "12px", color: PALETTE.muted }}>{c.service}{c.start_date ? ` · started ${c.start_date}` : ""}</div>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: PALETTE.green, flexShrink: 0 }}>{c.value}</div>
                  </div>
                  {c.notes && <div style={{ fontSize: "12px", color: PALETTE.faint, marginBottom: "10px", lineHeight: 1.5 }}>{c.notes}</div>}
                  {c.log.length > 0 && <div style={{ fontSize: "12px", color: PALETTE.muted, marginBottom: "12px", borderLeft: `2px solid ${PALETTE.accent}40`, paddingLeft: "10px", lineHeight: 1.5 }}>{c.log[0].text} <span style={{ color: PALETTE.faint }}>· {c.log[0].ts}</span></div>}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <GhostBtn onClick={() => setModal({ type: "client", data: c })}>Edit</GhostBtn>
                    <GhostBtn onClick={() => setModal({ type: "log", data: c })}>Log {c.log.length > 0 ? `(${c.log.length})` : ""}</GhostBtn>
                    <GhostBtn onClick={() => setModal({ type: "strategy", data: c })}>✦ Strategy</GhostBtn>
                    <GhostBtn danger onClick={() => deleteClient(c.id)}>Remove</GhostBtn>
                  </div>
                </Glass>
              ))}
            </div>
          )}

          {/* TASKS */}
          {tab === "tasks" && (
            <>
              {tasks.length === 0 && <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No tasks yet.</p>}
              {(["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => {
                const filtered = tasks.filter(t => t.status === status);
                if (!filtered.length) return null;
                return (
                  <div key={status} style={{ marginBottom: "26px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <Pill label={status} colour={SC[status]} />
                      <span style={{ fontSize: "11px", color: PALETTE.faint, fontWeight: 500 }}>{filtered.length} task{filtered.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {filtered.map(t => {
                        const od = isOverdue(t.due_date, t.status === "Done");
                        return (
                          <Glass key={t.id} style={{ padding: "16px 18px" }} overdue={od}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: "14px", fontWeight: 600, color: od ? PALETTE.red : PALETTE.text, marginBottom: "3px" }}>{od ? "⚠ " : ""}{t.title}</div>
                                <div style={{ fontSize: "11px", color: PALETTE.muted }}>{t.client} · due {t.due_date} · {t.assignee}</div>
                              </div>
                              <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                                <Pill label={t.priority} colour={PC[t.priority]} />
                                <Pill label={t.status} colour={SC[t.status]} onClick={() => cycleTaskStatus(t)} />
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <GhostBtn onClick={() => setModal({ type: "task", data: t })}>Edit</GhostBtn>
                              <GhostBtn danger onClick={() => deleteTask(t.id)}>Remove</GhostBtn>
                            </div>
                          </Glass>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* CONTENT */}
          {tab === "content" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {content.length === 0 && <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No content items yet.</p>}
              {content.map(item => {
                const od = isOverdue(item.due_date, item.status === "Delivered");
                return (
                  <Glass key={item.id} style={{ padding: "18px 20px" }} overdue={od}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 600, color: od ? PALETTE.red : PALETTE.text }}>{od ? "⚠ " : ""}{item.title}</span>
                          <Pill label={item.status} colour={SC[item.status] || PALETTE.blue} onClick={() => cycleContentStatus(item)} />
                        </div>
                        <div style={{ fontSize: "12px", color: PALETTE.muted }}>{item.client} · {item.type} · due {item.due_date}</div>
                      </div>
                    </div>
                    {item.notes && <div style={{ fontSize: "12px", color: PALETTE.faint, marginBottom: "12px", lineHeight: 1.5 }}>{item.notes}</div>}
                    <div style={{ display: "flex", gap: "6px" }}>
                      <GhostBtn onClick={() => setModal({ type: "content", data: item })}>Edit</GhostBtn>
                      <GhostBtn danger onClick={() => deleteContent(item.id)}>Remove</GhostBtn>
                    </div>
                  </Glass>
                );
              })}
            </div>
          )}

          {/* ENQUIRIES */}
          {tab === "enquiries" && (
            <>
              {syncMsg && <div style={{ fontSize: "12px", color: syncMsg.includes("failed") ? PALETTE.red : PALETTE.green, marginBottom: "14px", fontWeight: 500 }}>{syncMsg}</div>}
              {enquiries.length === 0 && <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No enquiries yet. Hit Sync Tally to pull in form submissions.</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {enquiries.map(enq => (
                  <Glass key={enq.id} style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 600 }}>{enq.name}</span>
                          <Pill label={enq.status} colour={SC[enq.status]} onClick={() => cycleEnqStatus(enq)} />
                        </div>
                        <div style={{ fontSize: "12px", color: PALETTE.muted }}>{enq.email}{enq.phone ? ` · ${enq.phone}` : ""}</div>
                        {enq.social && <div style={{ fontSize: "12px", color: PALETTE.faint, marginTop: "2px" }}>{enq.social}</div>}
                      </div>
                      <div style={{ fontSize: "11px", color: PALETTE.faint, flexShrink: 0 }}>{enq.created_at?.split("T")[0]}</div>
                    </div>
                    {enq.project && <div style={{ fontSize: "13px", color: PALETTE.muted, marginBottom: "12px", lineHeight: 1.55 }}>{enq.project}</div>}
                    <div style={{ display: "flex", gap: "6px" }}>
                      <GhostBtn onClick={() => setModal({ type: "enquiry", data: enq })}>Edit</GhostBtn>
                      <GhostBtn danger onClick={() => deleteEnquiry(enq.id)}>Remove</GhostBtn>
                    </div>
                  </Glass>
                ))}
              </div>
            </>
          )}
        </>}
      </div>

      {/* Modals */}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === "client" && <ClientForm initial={modal.data} onSave={saveClient} onClose={() => setModal(null)} />}
          {modal.type === "task" && <TaskForm initial={modal.data} clients={clients} onSave={saveTask} onClose={() => setModal(null)} />}
          {modal.type === "content" && <ContentForm initial={modal.data} clients={clients} onSave={saveContent} onClose={() => setModal(null)} />}
          {modal.type === "enquiry" && <EnquiryForm initial={modal.data} onSave={saveEnquiry} onClose={() => setModal(null)} />}
          {modal.type === "log" && <ClientLog client={modal.data} onUpdate={updateClientLog} onClose={() => setModal(null)} />}
          {modal.type === "strategy" && <StrategyGenerator client={modal.data} onClose={() => setModal(null)} />}
        </Modal>
      )}
    </div>
  );
}
