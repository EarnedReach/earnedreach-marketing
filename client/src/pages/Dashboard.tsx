import { useState, useEffect, useRef } from "react";

type ClientStatus = "Prospect" | "Active" | "Delivered" | "On Hold";
type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";
type ContentStatus = "Raw Footage" | "In Edit" | "Review" | "Delivered";

interface Client { id: string; name: string; service: string; status: ClientStatus; startDate: string; value: string; notes: string; }
interface Task { id: string; title: string; client: string; priority: TaskPriority; status: TaskStatus; dueDate: string; assignee: "David" | "PJ" | "Both"; }
interface ContentItem { id: string; title: string; client: string; type: string; status: ContentStatus; dueDate: string; notes: string; }
interface Enquiry { id: string; name: string; email: string; phone: string; social: string; project: string; date: string; status: "New" | "Contacted" | "Qualified" | "Closed"; }

const SEED_CLIENTS: Client[] = [
  { id: "1", name: "Elijah Fleming", service: "Brand Film", status: "Delivered", startDate: "2025-05-01", value: "£2,500", notes: "Fitness brand film. Delivered to Instagram." },
  { id: "2", name: "Michael Jordan", service: "YouTube Series + SF Growth", status: "Active", startDate: "2025-04-15", value: "£1,800/mo", notes: "Ongoing retainer. YouTube series + SF repurposing." },
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
const SEED_ENQUIRIES: Enquiry[] = [
  { id: "1", name: "Example Lead", email: "lead@example.com", phone: "+44 7700 000000", social: "@examplelead", project: "Looking for a brand film for my fitness coaching brand.", date: "2025-07-06", status: "New" },
];

const SC: Record<string, string> = {
  Prospect: "#6b9fff", Active: "#4ade80", Delivered: "#a78bfa", "On Hold": "#f59e0b",
  "To Do": "#6b9fff", "In Progress": "#f59e0b", Done: "#4ade80",
  "Raw Footage": "#6b9fff", "In Edit": "#f59e0b", Review: "#fb923c",
  New: "#6b9fff", Contacted: "#f59e0b", Qualified: "#4ade80", Closed: "#94a3b8",
};
const PC: Record<string, string> = { High: "#f87171", Medium: "#f59e0b", Low: "#4ade80" };

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => { const h = () => setM(window.innerWidth < 640); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return m;
}

function useLocalState<T>(key: string, seed: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [s, set] = useState<T>(() => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : seed; } catch { return seed; } });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(s)); }, [key, s]);
  return [s, set];
}

function Badge({ label, colour }: { label: string; colour: string }) {
  return <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: colour + "22", color: colour, border: `1px solid ${colour}44`, whiteSpace: "nowrap" }}>{label}</span>;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px", ...style }}>{children}</div>;
}

function Sec({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px", marginTop: 0 }}>{children}</h2>;
}

function PBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: "9px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{children}</button>;
}

function GBtn({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return <button onClick={onClick} style={{ padding: "5px 11px", borderRadius: "7px", border: `1px solid ${danger ? "rgba(248,113,113,0.35)" : "rgba(255,255,255,0.1)"}`, background: "transparent", color: danger ? "#f87171" : "rgba(255,255,255,0.55)", fontSize: "12px", cursor: "pointer" }}>{children}</button>;
}

const iStyle: React.CSSProperties = { width: "100%", padding: "10px 13px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "11px" };
const lStyle: React.CSSProperties = { fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px", display: "block" };
const sBtn: React.CSSProperties = { width: "100%", padding: "12px", borderRadius: "9px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "4px" };
const div5: React.CSSProperties = { borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", marginBottom: "10px" };

function uid() { return Math.random().toString(36).slice(2, 10); }

type Tab = "overview" | "clients" | "tasks" | "content" | "enquiries";
const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" }, { id: "clients", label: "Clients" },
  { id: "tasks", label: "Tasks" }, { id: "content", label: "Content" }, { id: "enquiries", label: "Enquiries" },
];

// ── Password Gate ──
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState(""); const [err, setErr] = useState(false);
  const go = () => { if (v === "earnedreach2025") { sessionStorage.setItem("er_dash_auth", "1"); onUnlock(); } else { setErr(true); setTimeout(() => setErr(false), 1200); } };
  return (
    <div style={{ minHeight: "100vh", background: "#080c1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif", padding: "24px" }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "320px" }}>
        <img src="/er-logo.png" alt="ER" style={{ width: "48px", marginBottom: "24px" }} />
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Studio Dashboard</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>EarnedReach internal access only</p>
        <input type="password" placeholder="Password" value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === "Enter" && go()}
          style={{ width: "100%", padding: "13px 15px", borderRadius: "11px", border: err ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "15px", outline: "none", marginBottom: "10px", boxSizing: "border-box" }} />
        {err && <p style={{ color: "#f87171", fontSize: "13px", margin: "0 0 10px" }}>Incorrect password</p>}
        <button onClick={go} style={{ width: "100%", padding: "13px", borderRadius: "11px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>Enter</button>
      </div>
    </div>
  );
}

// ── Modal ──
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f1628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px 20px 0 0", padding: "24px 20px 36px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ width: "32px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)", margin: "0 auto 18px" }} />
        {children}
      </div>
    </div>
  );
}

// ── Forms ──
function ClientForm({ initial, onSave, onClose, }: { initial?: Client; onSave: (c: Client) => void; onClose: () => void }) {
  const [f, setF] = useState<Client>(initial || { id: uid(), name: "", service: "", status: "Prospect", startDate: "", value: "", notes: "" });
  const u = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>{initial ? "Edit Client" : "Add Client"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Client name" />
    <label style={lStyle}>Service</label><input style={iStyle} value={f.service} onChange={u("service")} placeholder="e.g. Brand Film" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Prospect","Active","Delivered","On Hold"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Start Date</label><input style={iStyle} type="date" value={f.startDate} onChange={u("startDate")} />
    <label style={lStyle}>Value</label><input style={iStyle} value={f.value} onChange={u("value")} placeholder="£2,500 or £1,800/mo" />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "64px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
  </div>;
}

function TaskForm({ initial, clients, onSave, onClose }: { initial?: Task; clients: Client[]; onSave: (t: Task) => void; onClose: () => void }) {
  const [f, setF] = useState<Task>(initial || { id: uid(), title: "", client: clients[0]?.name || "", priority: "Medium", status: "To Do", dueDate: "", assignee: "David" });
  const u = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>{initial ? "Edit Task" : "Add Task"}</h3>
    <label style={lStyle}>Task</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="What needs doing?" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}<option value="Internal">Internal</option></select>
    <label style={lStyle}>Priority</label><select style={iStyle} value={f.priority} onChange={u("priority")}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select>
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["To Do","In Progress","Done"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Assignee</label><select style={iStyle} value={f.assignee} onChange={u("assignee")}>{["David","PJ","Both"].map(a=><option key={a}>{a}</option>)}</select>
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
  </div>;
}

function ContentForm({ initial, clients, onSave, onClose }: { initial?: ContentItem; clients: Client[]; onSave: (c: ContentItem) => void; onClose: () => void }) {
  const [f, setF] = useState<ContentItem>(initial || { id: uid(), title: "", client: clients[0]?.name || "", type: "", status: "Raw Footage", dueDate: "", notes: "" });
  const u = (k: keyof ContentItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>{initial ? "Edit Content" : "Add Content"}</h3>
    <label style={lStyle}>Title</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="e.g. MJ EP4 — Full Cut" />
    <label style={lStyle}>Client</label><select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select>
    <label style={lStyle}>Type</label><input style={iStyle} value={f.type} onChange={u("type")} placeholder="YouTube Episode, Short Form…" />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["Raw Footage","In Edit","Review","Delivered"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "64px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
  </div>;
}

function EnquiryForm({ initial, onSave, onClose }: { initial?: Enquiry; onSave: (e: Enquiry) => void; onClose: () => void }) {
  const [f, setF] = useState<Enquiry>(initial || { id: uid(), name: "", email: "", phone: "", social: "", project: "", date: new Date().toISOString().split("T")[0], status: "New" });
  const u = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <div>
    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>{initial ? "Edit Enquiry" : "Add Enquiry"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Full name" />
    <label style={lStyle}>Email</label><input style={iStyle} value={f.email} onChange={u("email")} placeholder="email@example.com" />
    <label style={lStyle}>Phone</label><input style={iStyle} value={f.phone} onChange={u("phone")} placeholder="+44..." />
    <label style={lStyle}>Social</label><input style={iStyle} value={f.social} onChange={u("social")} placeholder="@handle" />
    <label style={lStyle}>Project Brief</label><textarea style={{ ...iStyle, minHeight: "64px", resize: "vertical" }} value={f.project} onChange={u("project")} />
    <label style={lStyle}>Date</label><input style={iStyle} type="date" value={f.date} onChange={u("date")} />
    <label style={lStyle}>Status</label><select style={iStyle} value={f.status} onChange={u("status")}>{["New","Contacted","Qualified","Closed"].map(s=><option key={s}>{s}</option>)}</select>
    <button style={sBtn} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
  </div>;
}

// ── Main ──
export default function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("er_dash_auth") === "1");
  const [tab, setTab] = useState<Tab>("overview");
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);

  const [clients, setClients] = useLocalState<Client[]>("er_clients", SEED_CLIENTS);
  const [tasks, setTasks] = useLocalState<Task[]>("er_tasks", SEED_TASKS);
  const [content, setContent] = useLocalState<ContentItem[]>("er_content", SEED_CONTENT);
  const [enquiries, setEnquiries] = useLocalState<Enquiry[]>("er_enquiries", SEED_ENQUIRIES);

  type MS = { type: "client"; data?: Client } | { type: "task"; data?: Task } | { type: "content"; data?: ContentItem } | { type: "enquiry"; data?: Enquiry } | null;
  const [modal, setModal] = useState<MS>(null);

  useEffect(() => {
    const el = navRef.current?.querySelector("[data-active='true']") as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [tab]);

  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />;

  const aC = clients.filter(c => c.status === "Active").length;
  const pT = tasks.filter(t => t.status !== "Done").length;
  const iC = content.filter(c => c.status !== "Delivered").length;
  const nE = enquiries.filter(e => e.status === "New").length;

  const pad = isMobile ? "18px 16px" : "24px 32px";

  return (
    <div style={{ minHeight: "100vh", background: "#080c1a", color: "#fff", fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "#080c1a", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "12px 16px 10px" : "14px 32px 0", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <img src="/er-logo.png" alt="ER" style={{ width: "26px" }} />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Studio</span>
          </div>
          <a href="/" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Site</a>
        </div>
        {/* Tabs — horizontally scrollable */}
        <div ref={navRef} style={{ display: "flex", gap: "2px", overflowX: "auto", scrollbarWidth: "none", padding: isMobile ? "8px 12px 0" : "8px 28px 0", WebkitOverflowScrolling: "touch" }}>
          {TABS.map(t => (
            <button key={t.id} data-active={tab === t.id} onClick={() => setTab(t.id)} style={{
              padding: "7px 14px", borderRadius: "999px 999px 0 0", border: "none", cursor: "pointer", fontSize: "13px",
              fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
              background: tab === t.id ? "rgba(255,255,255,0.08)" : "transparent",
              borderBottom: tab === t.id ? "2px solid #6b9fff" : "2px solid transparent",
              flexShrink: 0, transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: pad, maxWidth: "1100px", margin: "0 auto" }}>

        {/* OVERVIEW */}
        {tab === "overview" && <>
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 700, margin: "0 0 3px" }}>Overview</h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          {/* Stats 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
            {[["Active Clients", String(aC), "#4ade80"], ["Outstanding Tasks", String(pT), "#f59e0b"], ["Content In Progress", String(iC), "#6b9fff"], ["New Enquiries", String(nE), "#a78bfa"]].map(([l, v, c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "13px", padding: "14px 16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>{l}</div>
                <div style={{ fontSize: "26px", fontWeight: 700, color: c, lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>
          {/* Panels — stacked on mobile, 2-col on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
            {/* Outstanding tasks */}
            <Card>
              <Sec>Outstanding Tasks</Sec>
              {tasks.filter(t => t.status !== "Done").length === 0
                ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>All clear ✓</p>
                : tasks.filter(t => t.status !== "Done").slice(0, 5).map((task, i, a) => (
                  <div key={task.id} style={{ ...div5, ...(i === a.length - 1 ? { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{task.title}</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{task.client} · {task.dueDate}</div>
                      </div>
                      <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                        <Badge label={task.priority} colour={PC[task.priority]} />
                        <Badge label={task.assignee} colour="#6b9fff" />
                      </div>
                    </div>
                  </div>
                ))}
            </Card>
            {/* Content in progress */}
            <Card>
              <Sec>Content In Progress</Sec>
              {content.filter(c => c.status !== "Delivered").length === 0
                ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>Nothing in progress</p>
                : content.filter(c => c.status !== "Delivered").map((item, i, a) => (
                  <div key={item.id} style={{ ...div5, ...(i === a.length - 1 ? { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{item.client} · {item.type}</div>
                      </div>
                      <Badge label={item.status} colour={SC[item.status] || "#6b9fff"} />
                    </div>
                  </div>
                ))}
            </Card>
            {/* Active clients */}
            <Card>
              <Sec>Active Clients</Sec>
              {clients.filter(c => c.status === "Active").map((client, i, a) => (
                <div key={client.id} style={{ ...div5, ...(i === a.length - 1 ? { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 500 }}>{client.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{client.service}</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>{client.value}</div>
                  </div>
                </div>
              ))}
            </Card>
            {/* New enquiries */}
            <Card>
              <Sec>New Enquiries</Sec>
              {enquiries.filter(e => e.status === "New").length === 0
                ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>No new enquiries</p>
                : enquiries.filter(e => e.status === "New").map((enq, i, a) => (
                  <div key={enq.id} style={{ ...div5, ...(i === a.length - 1 ? { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "3px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 500 }}>{enq.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{enq.date}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "3px" }}>{enq.email}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{enq.project}</div>
                  </div>
                ))}
            </Card>
          </div>
        </>}

        {/* CLIENTS */}
        {tab === "clients" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h1 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 700, margin: 0 }}>Clients</h1>
            <PBtn onClick={() => setModal({ type: "client" })}>+ Add</PBtn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {clients.map(c => (
              <Card key={c.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>{c.name}</span>
                      <Badge label={c.status} colour={SC[c.status]} />
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{c.service} · {c.startDate}</div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#4ade80", flexShrink: 0 }}>{c.value}</div>
                </div>
                {c.notes && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>{c.notes}</div>}
                <div style={{ display: "flex", gap: "6px" }}>
                  <GBtn onClick={() => setModal({ type: "client", data: c })}>Edit</GBtn>
                  <GBtn danger onClick={() => setClients(p => p.filter(x => x.id !== c.id))}>Remove</GBtn>
                </div>
              </Card>
            ))}
          </div>
        </>}

        {/* TASKS */}
        {tab === "tasks" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h1 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 700, margin: 0 }}>Outstanding Work</h1>
            <PBtn onClick={() => setModal({ type: "task" })}>+ Add</PBtn>
          </div>
          {(["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => {
            const filtered = tasks.filter(t => t.status === status);
            if (!filtered.length) return null;
            return (
              <div key={status} style={{ marginBottom: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "9px" }}>
                  <Badge label={status} colour={SC[status]} />
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{filtered.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {filtered.map(t => (
                    <Card key={t.id} style={{ padding: "13px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "2px" }}>{t.title}</div>
                          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{t.client} · {t.dueDate} · {t.assignee}</div>
                        </div>
                        <Badge label={t.priority} colour={PC[t.priority]} />
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <GBtn onClick={() => setModal({ type: "task", data: t })}>Edit</GBtn>
                        <GBtn danger onClick={() => setTasks(p => p.filter(x => x.id !== t.id))}>Remove</GBtn>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </>}

        {/* CONTENT */}
        {tab === "content" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h1 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 700, margin: 0 }}>Content Queue</h1>
            <PBtn onClick={() => setModal({ type: "content" })}>+ Add</PBtn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {content.map(item => (
              <Card key={item.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>{item.title}</span>
                      <Badge label={item.status} colour={SC[item.status] || "#6b9fff"} />
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.client} · {item.type} · {item.dueDate}</div>
                  </div>
                </div>
                {item.notes && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>{item.notes}</div>}
                <div style={{ display: "flex", gap: "6px" }}>
                  <GBtn onClick={() => setModal({ type: "content", data: item })}>Edit</GBtn>
                  <GBtn danger onClick={() => setContent(p => p.filter(x => x.id !== item.id))}>Remove</GBtn>
                </div>
              </Card>
            ))}
          </div>
        </>}

        {/* ENQUIRIES */}
        {tab === "enquiries" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h1 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 700, margin: 0 }}>Enquiries</h1>
            <PBtn onClick={() => setModal({ type: "enquiry" })}>+ Add</PBtn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {enquiries.map(enq => (
              <Card key={enq.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>{enq.name}</span>
                      <Badge label={enq.status} colour={SC[enq.status]} />
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>{enq.email}{enq.phone ? ` · ${enq.phone}` : ""}</div>
                    {enq.social && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{enq.social}</div>}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{enq.date}</div>
                </div>
                {enq.project && <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px", lineHeight: 1.5 }}>{enq.project}</div>}
                <div style={{ display: "flex", gap: "6px" }}>
                  <GBtn onClick={() => setModal({ type: "enquiry", data: enq })}>Edit</GBtn>
                  <GBtn danger onClick={() => setEnquiries(p => p.filter(x => x.id !== enq.id))}>Remove</GBtn>
                </div>
              </Card>
            ))}
          </div>
        </>}
      </div>

      {/* Modals */}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === "client" && <ClientForm initial={modal.data} onSave={c => { setClients(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "task" && <TaskForm initial={modal.data} clients={clients} onSave={t => { setTasks(p => modal.data ? p.map(x => x.id === t.id ? t : x) : [...p, t]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "content" && <ContentForm initial={modal.data} clients={clients} onSave={c => { setContent(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "enquiry" && <EnquiryForm initial={modal.data} onSave={e => { setEnquiries(p => modal.data ? p.map(x => x.id === e.id ? e : x) : [...p, e]); setModal(null); }} onClose={() => setModal(null)} />}
        </Modal>
      )}
    </div>
  );
}
