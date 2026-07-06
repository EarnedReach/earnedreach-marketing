import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ClientStatus = "Prospect" | "Active" | "Delivered" | "On Hold";
type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";
type ContentStatus = "Raw Footage" | "In Edit" | "Review" | "Delivered";
type EnquiryStatus = "New" | "Contacted" | "Qualified" | "Closed";

interface Client {
  id: string; name: string; service: string; status: ClientStatus;
  startDate: string; value: string; notes: string;
  log: { id: string; text: string; ts: string }[];
}
interface Task {
  id: string; title: string; client: string; priority: TaskPriority;
  status: TaskStatus; dueDate: string; assignee: "David" | "PJ" | "Both";
}
interface ContentItem {
  id: string; title: string; client: string; type: string;
  status: ContentStatus; dueDate: string; notes: string;
}
interface Enquiry {
  id: string; name: string; email: string; phone: string; social: string;
  project: string; date: string; status: EnquiryStatus; tallyId?: string;
}

// ─── Seeds ────────────────────────────────────────────────────────────────────
const SEED_CLIENTS: Client[] = [
  { id: "1", name: "Elijah Fleming", service: "Brand Film", status: "Delivered", startDate: "2025-05-01", value: "£2,500", notes: "Fitness brand film. Delivered to Instagram.", log: [] },
  { id: "2", name: "Michael Jordan", service: "YouTube Series + SF Growth", status: "Active", startDate: "2025-04-15", value: "£1,800/mo", notes: "Ongoing retainer. YouTube series + SF repurposing.", log: [] },
];
const SEED_TASKS: Task[] = [
  { id: "1", title: "Edit Michael Jordan EP3", client: "Michael Jordan", priority: "High", status: "In Progress", dueDate: "2025-07-10", assignee: "PJ" },
  { id: "2", title: "Film prep for next shoot", client: "Michael Jordan", priority: "Medium", status: "To Do", dueDate: "2025-07-12", assignee: "David" },
  { id: "3", title: "Export SF clips from EP2", client: "Michael Jordan", priority: "High", status: "To Do", dueDate: "2025-07-08", assignee: "Both" },
  { id: "4", title: "Send Elijah final deliverables", client: "Elijah Fleming", priority: "Low", status: "Done", dueDate: "2025-06-20", assignee: "David" },
];
const SEED_CONTENT: ContentItem[] = [
  { id: "1", title: "MJ EP3 — Full Cut", client: "Michael Jordan", type: "YouTube Episode", status: "In Edit", dueDate: "2025-07-10", notes: "PJ editing. Rough cut by EOD." },
  { id: "2", title: "MJ EP2 — SF Clips (x6)", client: "Michael Jordan", type: "Short Form", status: "Raw Footage", dueDate: "2025-07-08", notes: "Clips to be cut from EP2 timeline." },
  { id: "3", title: "Elijah Brand Film — Final", client: "Elijah Fleming", type: "Brand Film", status: "Delivered", dueDate: "2025-06-20", notes: "Delivered. Live on Instagram." },
];
const SEED_ENQUIRIES: Enquiry[] = [];

// ─── Tally ────────────────────────────────────────────────────────────────────
const TALLY_KEY = "tly-KYMq88OTmI0tYcS2iBKXwcARisCCNlCs";
const TALLY_FORM_ID = "PdgPKP";
const Q = { firstName: "GLg6lo", lastName: "OLgaG8", phone: "VVdGJv", email: "PlgpOb", social: "ELgKWN", project: "rVp5Pv" };

// ─── Colour palette ───────────────────────────────────────────────────────────
const PALETTE = {
  bg: "#09090f",
  surface: "#111118",
  surfaceHover: "#16161f",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.12)",
  text: "#f0f0f5",
  muted: "rgba(240,240,245,0.4)",
  faint: "rgba(240,240,245,0.18)",
  accent: "#5b6ef5",
  accentGlow: "rgba(91,110,245,0.18)",
  green: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
  blue: "#60a5fa",
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

function cycleNext<T>(arr: T[], current: T): T {
  return arr[(arr.indexOf(current) + 1) % arr.length];
}
function isOverdue(dueDate: string, done: boolean): boolean {
  if (done || !dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}
function uid() { return Math.random().toString(36).slice(2, 10); }

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => { const h = () => setM(window.innerWidth < 640); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return m;
}
function useLocalState<T>(key: string, seed: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [s, set] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key);
      if (!v) return seed;
      const parsed = JSON.parse(v);
      if (key === "er_clients" && Array.isArray(parsed)) {
        return parsed.map((c: Client) => ({ log: [], ...c })) as unknown as T;
      }
      return parsed;
    } catch { return seed; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(s)); }, [key, s]);
  return [s, set];
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const iStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: "10px",
  border: `1px solid ${PALETTE.border}`, background: PALETTE.surface,
  color: PALETTE.text, fontSize: "14px", outline: "none",
  boxSizing: "border-box", marginBottom: "12px",
  transition: "border-color 0.15s",
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
const div5: React.CSSProperties = {
  borderBottom: `1px solid ${PALETTE.border}`, paddingBottom: "12px", marginBottom: "12px",
};

// ─── UI Primitives ────────────────────────────────────────────────────────────
function Pill({ label, colour, onClick }: { label: string; colour: string; onClick?: () => void }) {
  return (
    <span onClick={onClick} title={onClick ? "Tap to advance" : undefined} style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600,
      background: colour + "18", color: colour, border: `1px solid ${colour}30`,
      whiteSpace: "nowrap", cursor: onClick ? "pointer" : "default", userSelect: "none",
      transition: "background 0.15s",
    }}>
      {label}{onClick && <span style={{ opacity: 0.6, fontSize: "10px" }}>↻</span>}
    </span>
  );
}

function Glass({ children, style, overdue }: { children: React.ReactNode; style?: React.CSSProperties; overdue?: boolean }) {
  return (
    <div style={{
      background: overdue ? `rgba(248,113,113,0.05)` : PALETTE.surface,
      border: `1px solid ${overdue ? "rgba(248,113,113,0.2)" : PALETTE.border}`,
      borderRadius: "16px",
      backdropFilter: "blur(12px)",
      ...style,
    }}>{children}</div>
  );
}

function StatCard({ label, value, colour, sub }: { label: string; value: string; colour: string; sub?: string }) {
  return (
    <div style={{
      background: PALETTE.surface, border: `1px solid ${PALETTE.border}`,
      borderRadius: "16px", padding: "18px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${colour}, transparent)`,
      }} />
      <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: PALETTE.muted, marginBottom: "10px" }}>{label}</div>
      <div style={{ fontSize: "30px", fontWeight: 700, color: colour, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: PALETTE.faint, marginTop: "5px" }}>{sub}</div>}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.faint, marginBottom: "14px" }}>{children}</div>
  );
}

function PrimaryBtn({ onClick, children, loading, small }: { onClick: () => void; children: React.ReactNode; loading?: boolean; small?: boolean }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      padding: small ? "7px 14px" : "9px 18px", borderRadius: "10px", border: "none",
      background: loading ? `${PALETTE.accent}60` : `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`,
      color: "#fff", fontSize: small ? "12px" : "13px", fontWeight: 600,
      cursor: loading ? "default" : "pointer", whiteSpace: "nowrap",
      boxShadow: loading ? "none" : `0 2px 12px ${PALETTE.accentGlow}`,
      transition: "opacity 0.15s",
    }}>
      {loading ? "Syncing…" : children}
    </button>
  );
}

function GhostBtn({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px", borderRadius: "8px",
      border: `1px solid ${danger ? "rgba(248,113,113,0.25)" : PALETTE.border}`,
      background: "transparent",
      color: danger ? PALETTE.red : PALETTE.muted,
      fontSize: "12px", cursor: "pointer", fontWeight: 500,
      transition: "border-color 0.15s, color 0.15s",
    }}>{children}</GhostBtn>
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
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px", margin: "0 auto 20px",
            background: `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`,
            boxShadow: `0 8px 32px ${PALETTE.accentGlow}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src="/er-logo.png" alt="ER" style={{ width: "28px" }} />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: PALETTE.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Studio Dashboard</h1>
          <p style={{ fontSize: "13px", color: PALETTE.muted, margin: 0 }}>EarnedReach internal access only</p>
        </div>
        <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: "18px", padding: "24px" }}>
          <input
            type="password" placeholder="Enter password" value={v}
            onChange={e => setV(e.target.value)} onKeyDown={e => e.key === "Enter" && go()}
            style={{ ...iStyle, marginBottom: err ? "8px" : "14px", border: `1px solid ${err ? PALETTE.red : PALETTE.border}` }}
          />
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
      <div onClick={e => e.stopPropagation()} style={{
        background: PALETTE.surface, border: `1px solid ${PALETTE.borderStrong}`,
        borderRadius: "22px 22px 0 0", padding: "24px 22px 40px",
        width: "100%", maxWidth: "520px", maxHeight: "92vh", overflowY: "auto",
      }}>
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: PALETTE.border, margin: "0 auto 22px" }} />
        {children}
      </div>
    </div>
  );
}

// ─── Forms ────────────────────────────────────────────────────────────────────
function ClientForm({ initial, onSave, onClose }: { initial?: Client; onSave: (c: Client) => void; onClose: () => void }) {
  const [f, setF] = useState<Client>(initial || { id: uid(), name: "", service: "", status: "Prospect", startDate: "", value: "", notes: "", log: [] });
  const u = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Client" : "New Client"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Client name" />
    <label style={lStyle}>Service</label><input style={iStyle} value={f.service} onChange={u("service")} placeholder="e.g. Brand Film" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Prospect","Active","Delivered","On Hold"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Start Date</label><input style={iStyle} type="date" value={f.startDate} onChange={u("startDate")} />
    <label style={lStyle}>Value</label><input style={iStyle} value={f.value} onChange={u("value")} placeholder="£2,500 or £1,800/mo" />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}

function TaskForm({ initial, clients, onSave, onClose }: { initial?: Task; clients: Client[]; onSave: (t: Task) => void; onClose: () => void }) {
  const [f, setF] = useState<Task>(initial || { id: uid(), title: "", client: clients[0]?.name || "", priority: "Medium", status: "To Do", dueDate: "", assignee: "David" });
  const u = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Task" : "New Task"}</h3>
    <label style={lStyle}>Task</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="What needs doing?" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}<option value="Internal">Internal</option></select>
    <label style={lStyle}>Priority</label><select style={iStyle} value={f.priority} onChange={u("priority")}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select>
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["To Do","In Progress","Done"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Assignee</label><select style={iStyle} value={f.assignee} onChange={u("assignee")}>{["David","PJ","Both"].map(a=><option key={a}>{a}</option>)}</select>
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}

function ContentForm({ initial, clients, onSave, onClose }: { initial?: ContentItem; clients: Client[]; onSave: (c: ContentItem) => void; onClose: () => void }) {
  const [f, setF] = useState<ContentItem>(initial || { id: uid(), title: "", client: clients[0]?.name || "", type: "", status: "Raw Footage", dueDate: "", notes: "" });
  const u = (k: keyof ContentItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Content" : "New Content"}</h3>
    <label style={lStyle}>Title</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="e.g. MJ EP4 — Full Cut" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select>
    <label style={lStyle}>Type</label><input style={iStyle} value={f.type} onChange={u("type")} placeholder="YouTube Episode, Short Form…" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Raw Footage","In Edit","Review","Delivered"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: `1px solid ${PALETTE.border}`, boxShadow: "none", marginTop: "8px", color: PALETTE.muted }} onClick={onClose}>Cancel</button>
  </div>;
}

function EnquiryForm({ initial, onSave, onClose }: { initial?: Enquiry; onSave: (e: Enquiry) => void; onClose: () => void }) {
  const [f, setF] = useState<Enquiry>(initial || { id: uid(), name: "", email: "", phone: "", social: "", project: "", date: new Date().toISOString().split("T")[0], status: "New" });
  const u = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 20px", color: PALETTE.text }}>{initial ? "Edit Enquiry" : "New Enquiry"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Full name" />
    <label style={lStyle}>Email</label><input style={iStyle} value={f.email} onChange={u("email")} placeholder="email@example.com" />
    <label style={lStyle}>Phone</label><input style={iStyle} value={f.phone} onChange={u("phone")} placeholder="+44..." />
    <label style={lStyle}>Social</label><input style={iStyle} value={f.social} onChange={u("social")} placeholder="@handle" />
    <label style={lStyle}>Project Brief</label><textarea style={{ ...iStyle, minHeight: "70px", resize: "vertical" }} value={f.project} onChange={u("project")} />
    <label style={lStyle}>Date</label><input style={iStyle} type="date" value={f.date} onChange={u("date")} />
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
    <textarea value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); } }}
      placeholder="Add a note… (Enter to save)" style={{ ...iStyle, minHeight: "72px", resize: "vertical", marginBottom: "8px" }} />
    <button style={sBtn} onClick={addNote}>Add Note</button>
    <div style={{ marginTop: "20px" }}>
      {client.log.length === 0
        ? <p style={{ color: PALETTE.faint, fontSize: "13px" }}>No notes yet</p>
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

  const [clients, setClients] = useLocalState<Client[]>("er_clients", SEED_CLIENTS);
  const [tasks, setTasks] = useLocalState<Task[]>("er_tasks", SEED_TASKS);
  const [content, setContent] = useLocalState<ContentItem[]>("er_content", SEED_CONTENT);
  const [enquiries, setEnquiries] = useLocalState<Enquiry[]>("er_enquiries", SEED_ENQUIRIES);
  const [syncedIds, setSyncedIds] = useLocalState<string[]>("er_tally_synced", []);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  type MS =
    | { type: "client"; data?: Client }
    | { type: "task"; data?: Task }
    | { type: "content"; data?: ContentItem }
    | { type: "enquiry"; data?: Enquiry }
    | { type: "log"; data: Client }
    | null;
  const [modal, setModal] = useState<MS>(null);

  useEffect(() => {
    const el = navRef.current?.querySelector("[data-active='true']") as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [tab]);

  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />;

  const syncTally = async () => {
    setSyncing(true); setSyncMsg("");
    try {
      const res = await fetch(`https://api.tally.so/forms/${TALLY_FORM_ID}/submissions?limit=100`, { headers: { Authorization: `Bearer ${TALLY_KEY}` } });
      const data = await res.json();
      const subs: { id: string; submittedAt: string; responses: { questionId: string; answer: string }[] }[] = data.submissions || [];
      const newOnes = subs.filter(s => !syncedIds.includes(s.id));
      if (!newOnes.length) { setSyncMsg("Already up to date"); setSyncing(false); return; }
      const toAdd: Enquiry[] = newOnes.map(s => {
        const get = (qId: string) => s.responses.find(r => r.questionId === qId)?.answer || "";
        return { id: uid(), tallyId: s.id, name: `${get(Q.firstName)} ${get(Q.lastName)}`.trim(), email: get(Q.email), phone: get(Q.phone), social: get(Q.social), project: get(Q.project), date: s.submittedAt.split("T")[0], status: "New" };
      });
      setEnquiries(prev => [...toAdd, ...prev]);
      setSyncedIds(prev => [...prev, ...newOnes.map(s => s.id)]);
      setSyncMsg(`${toAdd.length} new enquir${toAdd.length === 1 ? "y" : "ies"} synced`);
    } catch { setSyncMsg("Sync failed"); }
    setSyncing(false);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const aC = clients.filter(c => c.status === "Active").length;
  const pT = tasks.filter(t => t.status !== "Done").length;
  const iC = content.filter(c => c.status !== "Delivered").length;
  const nE = enquiries.filter(e => e.status === "New").length;

  const pageTitle = TABS.find(t => t.id === tab)?.label || "";

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, color: PALETTE.text, fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${PALETTE.border}`, position: "sticky", top: 0, background: PALETTE.bg, zIndex: 100, backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "14px 18px 0" : "16px 36px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: `linear-gradient(135deg, ${PALETTE.accent}, #818cf8)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 2px 10px ${PALETTE.accentGlow}`,
            }}>
              <img src="/er-logo.png" alt="ER" style={{ width: "16px" }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>EarnedReach Studio</span>
          </div>
          <a href="/" style={{ fontSize: "12px", color: PALETTE.faint, textDecoration: "none", fontWeight: 500 }}>← Back to site</a>
        </div>

        {/* Tabs */}
        <div ref={navRef} style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: isMobile ? "10px 14px 0" : "10px 32px 0", gap: "2px", WebkitOverflowScrolling: "touch" }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} data-active={active} onClick={() => setTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px 10px", border: "none", cursor: "pointer", fontSize: "13px",
                fontWeight: active ? 600 : 400,
                color: active ? PALETTE.text : PALETTE.muted,
                background: "transparent",
                borderBottom: active ? `2px solid ${PALETTE.accent}` : "2px solid transparent",
                flexShrink: 0, transition: "all 0.15s", borderRadius: "0",
              }}>
                <span style={{ fontSize: "11px", opacity: active ? 1 : 0.5 }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Page ── */}
      <div style={{ padding: isMobile ? "22px 18px" : "28px 36px", maxWidth: "1120px", margin: "0 auto" }}>

        {/* Page header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 700, margin: "0 0 3px", letterSpacing: "-0.02em" }}>{pageTitle}</h1>
            {tab === "overview" && <p style={{ color: PALETTE.muted, fontSize: "12px", margin: 0 }}>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>}
          </div>
          {tab === "clients" && <PrimaryBtn onClick={() => setModal({ type: "client" })}>+ New Client</PrimaryBtn>}
          {tab === "tasks" && <PrimaryBtn onClick={() => setModal({ type: "task" })}>+ New Task</PrimaryBtn>}
          {tab === "content" && <PrimaryBtn onClick={() => setModal({ type: "content" })}>+ New Item</PrimaryBtn>}
          {tab === "enquiries" && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <PrimaryBtn onClick={syncTally} loading={syncing} small>↻ Sync Tally</PrimaryBtn>
              <PrimaryBtn onClick={() => setModal({ type: "enquiry" })} small>+ Add</PrimaryBtn>
            </div>
          )}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            <StatCard label="Active Clients" value={String(aC)} colour={PALETTE.green} />
            <StatCard label="Outstanding Tasks" value={String(pT)} colour={PALETTE.amber} />
            <StatCard label="In Progress" value={String(iC)} colour={PALETTE.blue} sub="content items" />
            <StatCard label="New Enquiries" value={String(nE)} colour={PALETTE.purple} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
            {/* Outstanding tasks */}
            <Glass style={{ padding: "20px" }}>
              <SectionLabel>Outstanding Tasks</SectionLabel>
              {tasks.filter(t => t.status !== "Done").length === 0
                ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>All clear</p>
                : tasks.filter(t => t.status !== "Done").slice(0, 5).map((task, i, a) => {
                  const od = isOverdue(task.dueDate, false);
                  return (
                    <div key={task.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: od ? PALETTE.red : PALETTE.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{od ? "⚠ " : ""}{task.title}</div>
                          <div style={{ fontSize: "11px", color: PALETTE.muted, marginTop: "3px" }}>{task.client} · {task.dueDate}</div>
                        </div>
                        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                          <Pill label={task.priority} colour={PC[task.priority]} />
                          <Pill label={task.assignee} colour={PALETTE.blue} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Glass>

            {/* Content in progress */}
            <Glass style={{ padding: "20px" }}>
              <SectionLabel>Content In Progress</SectionLabel>
              {content.filter(c => c.status !== "Delivered").length === 0
                ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>Nothing in progress</p>
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

            {/* Active clients */}
            <Glass style={{ padding: "20px" }}>
              <SectionLabel>Active Clients</SectionLabel>
              {clients.filter(c => c.status === "Active").length === 0
                ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>No active clients</p>
                : clients.filter(c => c.status === "Active").map((client, i, a) => (
                  <div key={client.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 500 }}>{client.name}</div>
                        <div style={{ fontSize: "11px", color: PALETTE.muted, marginTop: "3px" }}>{client.service}</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: PALETTE.green }}>{client.value}</div>
                    </div>
                  </div>
                ))}
            </Glass>

            {/* New enquiries */}
            <Glass style={{ padding: "20px" }}>
              <SectionLabel>New Enquiries</SectionLabel>
              {enquiries.filter(e => e.status === "New").length === 0
                ? <p style={{ color: PALETTE.faint, fontSize: "13px", margin: 0 }}>No new enquiries</p>
                : enquiries.filter(e => e.status === "New").map((enq, i, a) => (
                  <div key={enq.id} style={{ ...div5, ...(i === a.length - 1 ? { border: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 500 }}>{enq.name}</div>
                      <div style={{ fontSize: "11px", color: PALETTE.faint }}>{enq.date}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: PALETTE.muted, marginBottom: "2px" }}>{enq.email}</div>
                    <div style={{ fontSize: "12px", color: PALETTE.faint, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{enq.project}</div>
                  </div>
                ))}
            </Glass>
          </div>
        </>}

        {/* ── CLIENTS ── */}
        {tab === "clients" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {clients.map(c => (
              <Glass key={c.id} style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: c.notes || c.log.length ? "10px" : "12px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600 }}>{c.name}</span>
                      <Pill label={c.status} colour={SC[c.status]} />
                    </div>
                    <div style={{ fontSize: "12px", color: PALETTE.muted }}>{c.service} · started {c.startDate}</div>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: PALETTE.green, flexShrink: 0 }}>{c.value}</div>
                </div>
                {c.notes && <div style={{ fontSize: "12px", color: PALETTE.faint, marginBottom: "10px", lineHeight: 1.5 }}>{c.notes}</div>}
                {c.log.length > 0 && (
                  <div style={{ fontSize: "12px", color: PALETTE.muted, marginBottom: "12px", borderLeft: `2px solid ${PALETTE.accent}40`, paddingLeft: "10px", lineHeight: 1.5 }}>
                    {c.log[0].text} <span style={{ color: PALETTE.faint }}>· {c.log[0].ts}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <GhostBtn onClick={() => setModal({ type: "client", data: c })}>Edit</GhostBtn>
                  <GhostBtn onClick={() => setModal({ type: "log", data: c })}>Log {c.log.length > 0 ? `(${c.log.length})` : ""}</GhostBtn>
                  <GhostBtn danger onClick={() => setClients(p => p.filter(x => x.id !== c.id))}>Remove</GhostBtn>
                </div>
              </Glass>
            ))}
          </div>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <>
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
                      const od = isOverdue(t.dueDate, t.status === "Done");
                      return (
                        <Glass key={t.id} style={{ padding: "14px 18px" }} overdue={od}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "3px", color: od ? PALETTE.red : PALETTE.text }}>{od ? "⚠ " : ""}{t.title}</div>
                              <div style={{ fontSize: "11px", color: PALETTE.muted }}>{t.client} · due {t.dueDate} · {t.assignee}</div>
                            </div>
                            <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                              <Pill label={t.priority} colour={PC[t.priority]} />
                              <Pill label={t.status} colour={SC[t.status]}
                                onClick={() => setTasks(p => p.map(x => x.id === t.id ? { ...x, status: cycleNext(TASK_CYCLE, x.status) } : x))} />
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <GhostBtn onClick={() => setModal({ type: "task", data: t })}>Edit</GhostBtn>
                            <GhostBtn danger onClick={() => setTasks(p => p.filter(x => x.id !== t.id))}>Remove</GhostBtn>
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

        {/* ── CONTENT ── */}
        {tab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {content.map(item => {
              const od = isOverdue(item.dueDate, item.status === "Delivered");
              return (
                <Glass key={item.id} style={{ padding: "18px 20px" }} overdue={od}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: od ? PALETTE.red : PALETTE.text }}>{od ? "⚠ " : ""}{item.title}</span>
                        <Pill label={item.status} colour={SC[item.status] || PALETTE.blue}
                          onClick={() => setContent(p => p.map(x => x.id === item.id ? { ...x, status: cycleNext(CONTENT_CYCLE, x.status) } : x))} />
                      </div>
                      <div style={{ fontSize: "12px", color: PALETTE.muted }}>{item.client} · {item.type} · due {item.dueDate}</div>
                    </div>
                  </div>
                  {item.notes && <div style={{ fontSize: "12px", color: PALETTE.faint, marginBottom: "12px", lineHeight: 1.5 }}>{item.notes}</div>}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <GhostBtn onClick={() => setModal({ type: "content", data: item })}>Edit</GhostBtn>
                    <GhostBtn danger onClick={() => setContent(p => p.filter(x => x.id !== item.id))}>Remove</GhostBtn>
                  </div>
                </Glass>
              );
            })}
          </div>
        )}

        {/* ── ENQUIRIES ── */}
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
                        <Pill label={enq.status} colour={SC[enq.status]}
                          onClick={() => setEnquiries(p => p.map(x => x.id === enq.id ? { ...x, status: cycleNext(ENQ_CYCLE, x.status) } : x))} />
                      </div>
                      <div style={{ fontSize: "12px", color: PALETTE.muted }}>{enq.email}{enq.phone ? ` · ${enq.phone}` : ""}</div>
                      {enq.social && <div style={{ fontSize: "12px", color: PALETTE.faint, marginTop: "2px" }}>{enq.social}</div>}
                    </div>
                    <div style={{ fontSize: "11px", color: PALETTE.faint, flexShrink: 0 }}>{enq.date}</div>
                  </div>
                  {enq.project && <div style={{ fontSize: "13px", color: PALETTE.muted, marginBottom: "12px", lineHeight: 1.55 }}>{enq.project}</div>}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <GhostBtn onClick={() => setModal({ type: "enquiry", data: enq })}>Edit</GhostBtn>
                    <GhostBtn danger onClick={() => setEnquiries(p => p.filter(x => x.id !== enq.id))}>Remove</GhostBtn>
                  </div>
                </Glass>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modals ── */}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === "client" && <ClientForm initial={modal.data} onSave={c => { setClients(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "task" && <TaskForm initial={modal.data} clients={clients} onSave={t => { setTasks(p => modal.data ? p.map(x => x.id === t.id ? t : x) : [...p, t]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "content" && <ContentForm initial={modal.data} clients={clients} onSave={c => { setContent(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "enquiry" && <EnquiryForm initial={modal.data} onSave={e => { setEnquiries(p => modal.data ? p.map(x => x.id === e.id ? e : x) : [...p, e]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "log" && <ClientLog client={modal.data} onUpdate={c => { setClients(p => p.map(x => x.id === c.id ? c : x)); setModal({ type: "log", data: c }); }} onClose={() => setModal(null)} />}
        </Modal>
      )}
    </div>
  );
}
