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

// ─── Apple system colours (dark mode) ─────────────────────────────────────────
const A = {
  bg: "#000000",
  bg2: "#1c1c1e",
  bg3: "#2c2c2e",
  bg4: "#3a3a3c",
  separator: "rgba(84,84,88,0.6)",
  label: "#ffffff",
  label2: "rgba(235,235,245,0.6)",
  label3: "rgba(235,235,245,0.3)",
  label4: "rgba(235,235,245,0.16)",
  blue: "#0a84ff",
  green: "#30d158",
  orange: "#ff9f0a",
  red: "#ff453a",
  purple: "#bf5af2",
  teal: "#5ac8fa",
  indigo: "#5e5ce6",
  fill: "rgba(120,120,128,0.36)",
  fill2: "rgba(120,120,128,0.32)",
  fill3: "rgba(118,118,128,0.24)",
  fill4: "rgba(116,116,128,0.18)",
};

const SC: Record<string, string> = {
  Prospect: A.blue, Active: A.green, Delivered: A.purple, "On Hold": A.orange,
  "To Do": A.blue, "In Progress": A.orange, Done: A.green,
  "Raw Footage": A.blue, "In Edit": A.orange, Review: A.teal,
  New: A.blue, Contacted: A.orange, Qualified: A.green, Closed: A.label3,
};
const PC: Record<string, string> = { High: A.red, Medium: A.orange, Low: A.green };

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
  width: "100%", padding: "12px 16px", borderRadius: "10px",
  border: "none", background: A.fill3,
  color: A.label, fontSize: "15px", outline: "none",
  boxSizing: "border-box", marginBottom: "14px",
  WebkitAppearance: "none",
};
const lStyle: React.CSSProperties = {
  fontSize: "12px", color: A.label2, letterSpacing: "0.02em",
  marginBottom: "6px", display: "block", fontWeight: 400,
};
const sBtnStyle: React.CSSProperties = {
  width: "100%", padding: "14px", borderRadius: "12px", border: "none",
  background: A.blue, color: "#fff", fontSize: "15px", fontWeight: 600,
  cursor: "pointer", marginTop: "6px", letterSpacing: "-0.01em",
};

// ─── UI Primitives ────────────────────────────────────────────────────────────

/** Apple-style capsule badge */
function Tag({ label, colour, onClick }: { label: string; colour: string; onClick?: () => void }) {
  return (
    <span onClick={onClick} title={onClick ? "Tap to advance" : undefined} style={{
      display: "inline-flex", alignItems: "center", gap: "3px",
      padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: 500,
      background: colour + "22", color: colour,
      whiteSpace: "nowrap", cursor: onClick ? "pointer" : "default",
      userSelect: "none", letterSpacing: "0.01em",
    }}>
      {label}{onClick && <span style={{ opacity: 0.5, fontSize: "10px", marginLeft: "1px" }}>↻</span>}
    </span>
  );
}

/** Frosted glass card */
function Card({ children, style, overdue }: { children: React.ReactNode; style?: React.CSSProperties; overdue?: boolean }) {
  return (
    <div style={{
      background: overdue ? "rgba(255,69,58,0.08)" : A.bg2,
      borderRadius: "16px",
      overflow: "hidden",
      border: overdue ? "1px solid rgba(255,69,58,0.2)" : "none",
      ...style,
    }}>{children}</div>
  );
}

/** Inset grouped list row */
function Row({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{
      padding: "12px 16px",
      borderBottom: last ? "none" : `1px solid ${A.separator}`,
    }}>{children}</div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: "13px", fontWeight: 400, color: A.label2,
      padding: "0 4px 8px", letterSpacing: "0.01em",
      textTransform: "uppercase", fontSize: "11px" as unknown as undefined,
    }}>{children}</div>
  );
}

function PrimaryBtn({ onClick, children, loading, compact }: { onClick: () => void; children: React.ReactNode; loading?: boolean; compact?: boolean }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      padding: compact ? "7px 14px" : "9px 18px",
      borderRadius: "10px", border: "none",
      background: loading ? A.fill : A.blue,
      color: loading ? A.label3 : "#fff",
      fontSize: compact ? "13px" : "14px", fontWeight: 600,
      cursor: loading ? "default" : "pointer", whiteSpace: "nowrap",
      letterSpacing: "-0.01em",
    }}>
      {loading ? "Syncing…" : children}
    </button>
  );
}

function TextBtn({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{
      padding: "0", border: "none", background: "transparent",
      color: danger ? A.red : A.blue,
      fontSize: "14px", cursor: "pointer", fontWeight: 400,
    }}>{children}</button>
  );
}

// ─── Gate ─────────────────────────────────────────────────────────────────────
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState(""); const [err, setErr] = useState(false);
  const go = () => {
    if (v === "earnedreach2025") { sessionStorage.setItem("er_dash_auth", "1"); onUnlock(); }
    else { setErr(true); setTimeout(() => setErr(false), 900); }
  };
  return (
    <div style={{ minHeight: "100vh", background: A.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "320px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "16px",
            background: "linear-gradient(145deg,#1a1a2e,#16213e)",
            border: `1px solid ${A.fill}`,
            margin: "0 auto 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}>
            <img src="/er-logo.png" alt="ER" style={{ width: "34px" }} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: A.label, margin: "0 0 6px", letterSpacing: "-0.03em" }}>Studio</h1>
          <p style={{ fontSize: "14px", color: A.label2, margin: 0, fontWeight: 400 }}>EarnedReach internal</p>
        </div>

        <Card style={{ padding: "20px" }}>
          <input
            type="password" placeholder="Password" value={v}
            onChange={e => setV(e.target.value)} onKeyDown={e => e.key === "Enter" && go()}
            style={{ ...iStyle, background: err ? "rgba(255,69,58,0.12)" : A.fill3, marginBottom: err ? "8px" : "14px" }}
          />
          {err && <p style={{ color: A.red, fontSize: "13px", margin: "0 0 12px", textAlign: "center" }}>Incorrect password</p>}
          <button onClick={go} style={sBtnStyle}>Unlock</button>
        </Card>
      </div>
    </div>
  );
}

// ─── Modal (sheet) ────────────────────────────────────────────────────────────
function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: A.bg2, borderRadius: "20px 20px 0 0",
        padding: "8px 20px 44px", width: "100%", maxWidth: "540px",
        maxHeight: "92vh", overflowY: "auto",
        fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif",
      }}>
        <div style={{ width: "36px", height: "5px", borderRadius: "3px", background: A.fill, margin: "10px auto 22px" }} />
        {children}
      </div>
    </div>
  );
}

// ─── Forms ────────────────────────────────────────────────────────────────────
function ClientForm({ initial, onSave, onClose }: { initial?: Client; onSave: (c: Client) => void; onClose: () => void }) {
  const [f, setF] = useState<Client>(initial || { id: uid(), name: "", service: "", status: "Prospect", startDate: "", value: "", notes: "", log: [] });
  const u = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.02em" }}>{initial ? "Edit Client" : "New Client"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Client name" />
    <label style={lStyle}>Service</label><input style={iStyle} value={f.service} onChange={u("service")} placeholder="e.g. Brand Film" />
    <label style={lStyle}>Status</label>
    <select style={iStyle} value={f.status} onChange={u("status")}>{["Prospect","Active","Delivered","On Hold"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Start Date</label><input style={iStyle} type="date" value={f.startDate} onChange={u("startDate")} />
    <label style={lStyle}>Value</label><input style={iStyle} value={f.value} onChange={u("value")} placeholder="£2,500 or £1,800/mo" />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "72px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtnStyle} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtnStyle, background: A.fill3, color: A.label2, marginTop: "10px" }} onClick={onClose}>Cancel</button>
  </>;
}

function TaskForm({ initial, clients, onSave, onClose }: { initial?: Task; clients: Client[]; onSave: (t: Task) => void; onClose: () => void }) {
  const [f, setF] = useState<Task>(initial || { id: uid(), title: "", client: clients[0]?.name || "", priority: "Medium", status: "To Do", dueDate: "", assignee: "David" });
  const u = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.02em" }}>{initial ? "Edit Task" : "New Task"}</h3>
    <label style={lStyle}>Task</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="What needs doing?" />
    <label style={lStyle}>Client</label>
    <select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}<option value="Internal">Internal</option></select>
    <label style={lStyle}>Priority</label>
    <select style={iStyle} value={f.priority} onChange={u("priority")}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select>
    <label style={lStyle}>Status</label>
    <select style={iStyle} value={f.status} onChange={u("status")}>{["To Do","In Progress","Done"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Assignee</label>
    <select style={iStyle} value={f.assignee} onChange={u("assignee")}>{["David","PJ","Both"].map(a=><option key={a}>{a}</option>)}</select>
    <button style={sBtnStyle} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtnStyle, background: A.fill3, color: A.label2, marginTop: "10px" }} onClick={onClose}>Cancel</button>
  </>;
}

function ContentForm({ initial, clients, onSave, onClose }: { initial?: ContentItem; clients: Client[]; onSave: (c: ContentItem) => void; onClose: () => void }) {
  const [f, setF] = useState<ContentItem>(initial || { id: uid(), title: "", client: clients[0]?.name || "", type: "", status: "Raw Footage", dueDate: "", notes: "" });
  const u = (k: keyof ContentItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.02em" }}>{initial ? "Edit Content" : "New Content"}</h3>
    <label style={lStyle}>Title</label><input style={iStyle} value={f.title} onChange={u("title")} placeholder="e.g. MJ EP4 — Full Cut" />
    <label style={lStyle}>Client</label>
    <select style={iStyle} value={f.client} onChange={u("client")}>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select>
    <label style={lStyle}>Type</label><input style={iStyle} value={f.type} onChange={u("type")} placeholder="YouTube Episode, Short Form…" />
    <label style={lStyle}>Status</label>
    <select style={iStyle} value={f.status} onChange={u("status")}>{["Raw Footage","In Edit","Review","Delivered"].map(s=><option key={s}>{s}</option>)}</select>
    <label style={lStyle}>Due Date</label><input style={iStyle} type="date" value={f.dueDate} onChange={u("dueDate")} />
    <label style={lStyle}>Notes</label><textarea style={{ ...iStyle, minHeight: "72px", resize: "vertical" }} value={f.notes} onChange={u("notes")} />
    <button style={sBtnStyle} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtnStyle, background: A.fill3, color: A.label2, marginTop: "10px" }} onClick={onClose}>Cancel</button>
  </>;
}

function EnquiryForm({ initial, onSave, onClose }: { initial?: Enquiry; onSave: (e: Enquiry) => void; onClose: () => void }) {
  const [f, setF] = useState<Enquiry>(initial || { id: uid(), name: "", email: "", phone: "", social: "", project: "", date: new Date().toISOString().split("T")[0], status: "New" });
  const u = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  return <>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.02em" }}>{initial ? "Edit Enquiry" : "New Enquiry"}</h3>
    <label style={lStyle}>Name</label><input style={iStyle} value={f.name} onChange={u("name")} placeholder="Full name" />
    <label style={lStyle}>Email</label><input style={iStyle} value={f.email} onChange={u("email")} placeholder="email@example.com" />
    <label style={lStyle}>Phone</label><input style={iStyle} value={f.phone} onChange={u("phone")} placeholder="+44..." />
    <label style={lStyle}>Social</label><input style={iStyle} value={f.social} onChange={u("social")} placeholder="@handle" />
    <label style={lStyle}>Project Brief</label><textarea style={{ ...iStyle, minHeight: "72px", resize: "vertical" }} value={f.project} onChange={u("project")} />
    <label style={lStyle}>Date</label><input style={iStyle} type="date" value={f.date} onChange={u("date")} />
    <label style={lStyle}>Status</label>
    <select style={iStyle} value={f.status} onChange={u("status")}>{["New","Contacted","Qualified","Closed"].map(s=><option key={s}>{s}</option>)}</select>
    <button style={sBtnStyle} onClick={() => onSave(f)}>Save</button>
    <button style={{ ...sBtnStyle, background: A.fill3, color: A.label2, marginTop: "10px" }} onClick={onClose}>Cancel</button>
  </>;
}

function ClientLog({ client, onUpdate, onClose }: { client: Client; onUpdate: (c: Client) => void; onClose: () => void }) {
  const [note, setNote] = useState("");
  const addNote = () => {
    if (!note.trim()) return;
    const entry = { id: uid(), text: note.trim(), ts: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) };
    onUpdate({ ...client, log: [entry, ...client.log] });
    setNote("");
  };
  return <>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{client.name}</h3>
    <p style={{ fontSize: "13px", color: A.label2, margin: "0 0 20px" }}>Activity log</p>
    <textarea value={note} onChange={e => setNote(e.target.value)}
      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); } }}
      placeholder="Add a note… (Enter to save)"
      style={{ ...iStyle, minHeight: "72px", resize: "vertical", marginBottom: "10px" }} />
    <button style={sBtnStyle} onClick={addNote}>Add Note</button>
    <div style={{ marginTop: "22px" }}>
      {client.log.length === 0
        ? <p style={{ color: A.label3, fontSize: "14px", textAlign: "center", padding: "20px 0" }}>No notes yet</p>
        : <Card>
          {client.log.map((entry, i) => (
            <Row key={entry.id} last={i === client.log.length - 1}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ fontSize: "14px", color: A.label, lineHeight: 1.5, flex: 1 }}>{entry.text}</div>
                <div style={{ fontSize: "12px", color: A.label3, flexShrink: 0, marginTop: "2px" }}>{entry.ts}</div>
              </div>
            </Row>
          ))}
        </Card>}
    </div>
    <button style={{ ...sBtnStyle, background: A.fill3, color: A.label2, marginTop: "14px" }} onClick={onClose}>Done</button>
  </>;
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = "overview" | "clients" | "tasks" | "content" | "enquiries";
const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "clients", label: "Clients" },
  { id: "tasks", label: "Tasks" },
  { id: "content", label: "Content" },
  { id: "enquiries", label: "Enquiries" },
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

  const font = "-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif";
  const px = isMobile ? "16px" : "24px";

  return (
    <div style={{ minHeight: "100vh", background: A.bg, color: A.label, fontFamily: font }}>

      {/* ── Navigation Bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: `1px solid ${A.separator}`,
      }}>
        {/* Title bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "12px 16px 0" : "14px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: A.bg3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/er-logo.png" alt="ER" style={{ width: "18px" }} />
            </div>
            <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>EarnedReach Studio</span>
          </div>
          <a href="/" style={{ fontSize: "14px", color: A.blue, textDecoration: "none", fontWeight: 400 }}>Back</a>
        </div>

        {/* Tab bar */}
        <div ref={navRef} style={{
          display: "flex", overflowX: "auto", scrollbarWidth: "none",
          padding: isMobile ? "8px 12px 0" : "8px 20px 0",
          gap: "0", WebkitOverflowScrolling: "touch",
        }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} data-active={active} onClick={() => setTab(t.id)} style={{
                padding: "8px 14px 10px", border: "none", background: "transparent",
                color: active ? A.label : A.label2,
                fontSize: "14px", fontWeight: active ? 600 : 400,
                cursor: "pointer", flexShrink: 0,
                borderBottom: active ? `2px solid ${A.blue}` : "2px solid transparent",
                letterSpacing: "-0.01em", transition: "color 0.15s",
              }}>{t.label}</button>
            );
          })}
        </div>
      </div>

      {/* ── Page content ── */}
      <div style={{ padding: isMobile ? "20px 16px 40px" : "24px 24px 60px", maxWidth: "960px", margin: "0 auto" }}>

        {/* Page title + action */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: isMobile ? "26px" : "30px", fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>
              {TABS.find(t => t.id === tab)?.label}
            </h1>
            {tab === "overview" && (
              <p style={{ fontSize: "13px", color: A.label2, margin: "3px 0 0", fontWeight: 400 }}>
                {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {tab === "clients" && <PrimaryBtn onClick={() => setModal({ type: "client" })}>+ New</PrimaryBtn>}
            {tab === "tasks" && <PrimaryBtn onClick={() => setModal({ type: "task" })}>+ New</PrimaryBtn>}
            {tab === "content" && <PrimaryBtn onClick={() => setModal({ type: "content" })}>+ New</PrimaryBtn>}
            {tab === "enquiries" && <>
              <PrimaryBtn onClick={syncTally} loading={syncing} compact>↻ Sync</PrimaryBtn>
              <PrimaryBtn onClick={() => setModal({ type: "enquiry" })} compact>+ New</PrimaryBtn>
            </>}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && <>
          {/* Stats — 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
            {[
              { label: "Active Clients", value: aC, colour: A.green },
              { label: "Outstanding Tasks", value: pT, colour: A.orange },
              { label: "In Progress", value: iC, colour: A.blue, sub: "content items" },
              { label: "New Enquiries", value: nE, colour: A.purple },
            ].map(s => (
              <Card key={s.label} style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: "12px", color: A.label2, marginBottom: "8px", fontWeight: 400 }}>{s.label}</div>
                <div style={{ fontSize: "34px", fontWeight: 700, color: s.colour, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.value}</div>
                {s.sub && <div style={{ fontSize: "11px", color: A.label3, marginTop: "4px" }}>{s.sub}</div>}
              </Card>
            ))}
          </div>

          {/* Panels */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>

            {/* Outstanding tasks */}
            <div>
              <SectionHeader>Outstanding Tasks</SectionHeader>
              <Card>
                {tasks.filter(t => t.status !== "Done").length === 0
                  ? <Row last><span style={{ fontSize: "14px", color: A.label3 }}>All clear</span></Row>
                  : tasks.filter(t => t.status !== "Done").slice(0, 5).map((task, i, a) => {
                    const od = isOverdue(task.dueDate, false);
                    return (
                      <Row key={task.id} last={i === a.length - 1}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: "14px", fontWeight: 500, color: od ? A.red : A.label, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{od ? "⚠ " : ""}{task.title}</div>
                            <div style={{ fontSize: "12px", color: A.label2, marginTop: "2px" }}>{task.client} · {task.dueDate}</div>
                          </div>
                          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                            <Tag label={task.priority} colour={PC[task.priority]} />
                            <Tag label={task.assignee} colour={A.blue} />
                          </div>
                        </div>
                      </Row>
                    );
                  })}
              </Card>
            </div>

            {/* Content in progress */}
            <div>
              <SectionHeader>Content In Progress</SectionHeader>
              <Card>
                {content.filter(c => c.status !== "Delivered").length === 0
                  ? <Row last><span style={{ fontSize: "14px", color: A.label3 }}>Nothing in progress</span></Row>
                  : content.filter(c => c.status !== "Delivered").map((item, i, a) => (
                    <Row key={item.id} last={i === a.length - 1}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "14px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                          <div style={{ fontSize: "12px", color: A.label2, marginTop: "2px" }}>{item.client} · {item.type}</div>
                        </div>
                        <Tag label={item.status} colour={SC[item.status] || A.blue} />
                      </div>
                    </Row>
                  ))}
              </Card>
            </div>

            {/* Active clients */}
            <div>
              <SectionHeader>Active Clients</SectionHeader>
              <Card>
                {clients.filter(c => c.status === "Active").length === 0
                  ? <Row last><span style={{ fontSize: "14px", color: A.label3 }}>No active clients</span></Row>
                  : clients.filter(c => c.status === "Active").map((client, i, a) => (
                    <Row key={client.id} last={i === a.length - 1}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 500 }}>{client.name}</div>
                          <div style={{ fontSize: "12px", color: A.label2, marginTop: "2px" }}>{client.service}</div>
                        </div>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: A.green }}>{client.value}</div>
                      </div>
                    </Row>
                  ))}
              </Card>
            </div>

            {/* New enquiries */}
            <div>
              <SectionHeader>New Enquiries</SectionHeader>
              <Card>
                {enquiries.filter(e => e.status === "New").length === 0
                  ? <Row last><span style={{ fontSize: "14px", color: A.label3 }}>No new enquiries</span></Row>
                  : enquiries.filter(e => e.status === "New").map((enq, i, a) => (
                    <Row key={enq.id} last={i === a.length - 1}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 500 }}>{enq.name}</div>
                        <div style={{ fontSize: "12px", color: A.label3 }}>{enq.date}</div>
                      </div>
                      <div style={{ fontSize: "13px", color: A.label2, marginBottom: "2px" }}>{enq.email}</div>
                      <div style={{ fontSize: "13px", color: A.label3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{enq.project}</div>
                    </Row>
                  ))}
              </Card>
            </div>
          </div>
        </>}

        {/* ── CLIENTS ── */}
        {tab === "clients" && (
          <Card>
            {clients.length === 0 && <Row last><span style={{ fontSize: "14px", color: A.label3 }}>No clients yet</span></Row>}
            {clients.map((c, i) => (
              <Row key={c.id} last={i === clients.length - 1}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600 }}>{c.name}</span>
                      <Tag label={c.status} colour={SC[c.status]} />
                    </div>
                    <div style={{ fontSize: "13px", color: A.label2 }}>{c.service} · {c.startDate}</div>
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: A.green, flexShrink: 0 }}>{c.value}</div>
                </div>
                {c.notes && <div style={{ fontSize: "13px", color: A.label3, marginBottom: "8px", lineHeight: 1.5 }}>{c.notes}</div>}
                {c.log.length > 0 && (
                  <div style={{ fontSize: "13px", color: A.label2, marginBottom: "10px", borderLeft: `2px solid ${A.blue}`, paddingLeft: "10px", lineHeight: 1.5 }}>
                    {c.log[0].text} <span style={{ color: A.label3 }}>· {c.log[0].ts}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: "16px" }}>
                  <TextBtn onClick={() => setModal({ type: "client", data: c })}>Edit</TextBtn>
                  <TextBtn onClick={() => setModal({ type: "log", data: c })}>Log{c.log.length > 0 ? ` (${c.log.length})` : ""}</TextBtn>
                  <TextBtn danger onClick={() => setClients(p => p.filter(x => x.id !== c.id))}>Remove</TextBtn>
                </div>
              </Row>
            ))}
          </Card>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <>
            {(["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => {
              const filtered = tasks.filter(t => t.status === status);
              if (!filtered.length) return null;
              return (
                <div key={status} style={{ marginBottom: "24px" }}>
                  <SectionHeader>{status} · {filtered.length}</SectionHeader>
                  <Card>
                    {filtered.map((t, i) => {
                      const od = isOverdue(t.dueDate, t.status === "Done");
                      return (
                        <Row key={t.id} last={i === filtered.length - 1}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "14px", fontWeight: 500, color: od ? A.red : A.label, marginBottom: "2px" }}>{od ? "⚠ " : ""}{t.title}</div>
                              <div style={{ fontSize: "12px", color: A.label2 }}>{t.client} · due {t.dueDate} · {t.assignee}</div>
                            </div>
                            <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                              <Tag label={t.priority} colour={PC[t.priority]} />
                              <Tag label={t.status} colour={SC[t.status]}
                                onClick={() => setTasks(p => p.map(x => x.id === t.id ? { ...x, status: cycleNext(TASK_CYCLE, x.status) } : x))} />
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "16px" }}>
                            <TextBtn onClick={() => setModal({ type: "task", data: t })}>Edit</TextBtn>
                            <TextBtn danger onClick={() => setTasks(p => p.filter(x => x.id !== t.id))}>Remove</TextBtn>
                          </div>
                        </Row>
                      );
                    })}
                  </Card>
                </div>
              );
            })}
          </>
        )}

        {/* ── CONTENT ── */}
        {tab === "content" && (
          <Card>
            {content.length === 0 && <Row last><span style={{ fontSize: "14px", color: A.label3 }}>No content yet</span></Row>}
            {content.map((item, i) => {
              const od = isOverdue(item.dueDate, item.status === "Delivered");
              return (
                <Row key={item.id} last={i === content.length - 1}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: od ? A.red : A.label }}>{od ? "⚠ " : ""}{item.title}</span>
                        <Tag label={item.status} colour={SC[item.status] || A.blue}
                          onClick={() => setContent(p => p.map(x => x.id === item.id ? { ...x, status: cycleNext(CONTENT_CYCLE, x.status) } : x))} />
                      </div>
                      <div style={{ fontSize: "13px", color: A.label2 }}>{item.client} · {item.type} · due {item.dueDate}</div>
                    </div>
                  </div>
                  {item.notes && <div style={{ fontSize: "13px", color: A.label3, marginBottom: "10px", lineHeight: 1.5 }}>{item.notes}</div>}
                  <div style={{ display: "flex", gap: "16px" }}>
                    <TextBtn onClick={() => setModal({ type: "content", data: item })}>Edit</TextBtn>
                    <TextBtn danger onClick={() => setContent(p => p.filter(x => x.id !== item.id))}>Remove</TextBtn>
                  </div>
                </Row>
              );
            })}
          </Card>
        )}

        {/* ── ENQUIRIES ── */}
        {tab === "enquiries" && (
          <>
            {syncMsg && <p style={{ fontSize: "13px", color: syncMsg.includes("failed") ? A.red : A.green, margin: "0 0 14px", fontWeight: 500 }}>{syncMsg}</p>}
            <Card>
              {enquiries.length === 0 && <Row last><span style={{ fontSize: "14px", color: A.label3 }}>No enquiries yet. Tap Sync to pull from Tally.</span></Row>}
              {enquiries.map((enq, i) => (
                <Row key={enq.id} last={i === enquiries.length - 1}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>{enq.name}</span>
                        <Tag label={enq.status} colour={SC[enq.status]}
                          onClick={() => setEnquiries(p => p.map(x => x.id === enq.id ? { ...x, status: cycleNext(ENQ_CYCLE, x.status) } : x))} />
                      </div>
                      <div style={{ fontSize: "13px", color: A.label2 }}>{enq.email}{enq.phone ? ` · ${enq.phone}` : ""}</div>
                      {enq.social && <div style={{ fontSize: "13px", color: A.label3, marginTop: "1px" }}>{enq.social}</div>}
                    </div>
                    <div style={{ fontSize: "12px", color: A.label3, flexShrink: 0 }}>{enq.date}</div>
                  </div>
                  {enq.project && <div style={{ fontSize: "14px", color: A.label2, marginBottom: "10px", lineHeight: 1.55 }}>{enq.project}</div>}
                  <div style={{ display: "flex", gap: "16px" }}>
                    <TextBtn onClick={() => setModal({ type: "enquiry", data: enq })}>Edit</TextBtn>
                    <TextBtn danger onClick={() => setEnquiries(p => p.filter(x => x.id !== enq.id))}>Remove</TextBtn>
                  </div>
                </Row>
              ))}
            </Card>
          </>
        )}
      </div>

      {/* ── Sheets ── */}
      {modal && (
        <Sheet onClose={() => setModal(null)}>
          {modal.type === "client" && <ClientForm initial={modal.data} onSave={c => { setClients(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "task" && <TaskForm initial={modal.data} clients={clients} onSave={t => { setTasks(p => modal.data ? p.map(x => x.id === t.id ? t : x) : [...p, t]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "content" && <ContentForm initial={modal.data} clients={clients} onSave={c => { setContent(p => modal.data ? p.map(x => x.id === c.id ? c : x) : [...p, c]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "enquiry" && <EnquiryForm initial={modal.data} onSave={e => { setEnquiries(p => modal.data ? p.map(x => x.id === e.id ? e : x) : [...p, e]); setModal(null); }} onClose={() => setModal(null)} />}
          {modal.type === "log" && <ClientLog client={modal.data} onUpdate={c => { setClients(p => p.map(x => x.id === c.id ? c : x)); setModal({ type: "log", data: c }); }} onClose={() => setModal(null)} />}
        </Sheet>
      )}
    </div>
  );
}
