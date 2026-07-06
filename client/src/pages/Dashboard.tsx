import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ClientStatus = "Prospect" | "Active" | "Delivered" | "On Hold";
type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";
type ContentStatus = "Raw Footage" | "In Edit" | "Review" | "Delivered";

interface Client {
  id: string;
  name: string;
  service: string;
  status: ClientStatus;
  startDate: string;
  value: string;
  notes: string;
}

interface Task {
  id: string;
  title: string;
  client: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: "David" | "PJ" | "Both";
}

interface ContentItem {
  id: string;
  title: string;
  client: string;
  type: string;
  status: ContentStatus;
  dueDate: string;
  notes: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  social: string;
  project: string;
  date: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
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

// ─── Colours ──────────────────────────────────────────────────────────────────
const STATUS_COLOURS: Record<string, string> = {
  // Client
  Prospect: "#6b9fff",
  Active: "#4ade80",
  Delivered: "#a78bfa",
  "On Hold": "#f59e0b",
  // Task
  "To Do": "#6b9fff",
  "In Progress": "#f59e0b",
  Done: "#4ade80",
  // Content
  "Raw Footage": "#6b9fff",
  "In Edit": "#f59e0b",
  Review: "#fb923c",
  // Enquiry
  New: "#6b9fff",
  Contacted: "#f59e0b",
  Qualified: "#4ade80",
  Closed: "#94a3b8",
};

const PRIORITY_COLOURS: Record<string, string> = {
  High: "#f87171",
  Medium: "#f59e0b",
  Low: "#4ade80",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ label, colour }: { label: string; colour: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      background: colour + "22",
      color: colour,
      border: `1px solid ${colour}44`,
    }}>{label}</span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "24px",
      ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "13px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.35)",
      marginBottom: "16px",
      marginTop: 0,
    }}>{children}</h2>
  );
}

function StatCard({ label, value, sub, colour }: { label: string; value: string; sub?: string; colour?: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "20px 24px",
      flex: "1 1 0",
      minWidth: "140px",
    }}>
      <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "32px", fontWeight: 700, color: colour || "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>{sub}</div>}
    </div>
  );
}

// ─── Local Storage helpers ────────────────────────────────────────────────────
function useLocalState<T>(key: string, seed: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : seed;
    } catch { return seed; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

// ─── Password Gate ────────────────────────────────────────────────────────────
const DASHBOARD_PASSWORD = "earnedreach2025";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const attempt = () => {
    if (input === DASHBOARD_PASSWORD) {
      sessionStorage.setItem("er_dash_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "360px", padding: "0 24px" }}>
        <img src="/er-logo.png" alt="EarnedReach" style={{ width: "56px", marginBottom: "32px" }} />
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Studio Dashboard</h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>EarnedReach internal access only</p>
        <input
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && attempt()}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
            marginBottom: "12px",
            boxSizing: "border-box",
            transition: "border 0.2s",
          }}
        />
        {error && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px" }}>Incorrect password</p>}
        <button
          onClick={attempt}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #3b5bff, #6b9fff)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = "overview" | "clients" | "tasks" | "content" | "enquiries";

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("er_dash_auth") === "1");
  const [tab, setTab] = useState<Tab>("overview");
  const [clients, setClients] = useLocalState<Client[]>("er_clients", SEED_CLIENTS);
  const [tasks, setTasks] = useLocalState<Task[]>("er_tasks", SEED_TASKS);
  const [content, setContent] = useLocalState<ContentItem[]>("er_content", SEED_CONTENT);
  const [enquiries, setEnquiries] = useLocalState<Enquiry[]>("er_enquiries", SEED_ENQUIRIES);

  // Modal state
  const [modal, setModal] = useState<{ type: "client" | "task" | "content" | "enquiry"; data?: Client | Task | ContentItem | Enquiry } | null>(null);

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

  const activeClients = clients.filter(c => c.status === "Active").length;
  const pendingTasks = tasks.filter(t => t.status !== "Done").length;
  const inEditContent = content.filter(c => c.status === "In Edit" || c.status === "Raw Footage").length;
  const newEnquiries = enquiries.filter(e => e.status === "New").length;

  const base: React.CSSProperties = {
    minHeight: "100vh",
    background: "#080c1a",
    color: "#fff",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: "8px 18px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: tab === t ? 600 : 400,
    color: tab === t ? "#fff" : "rgba(255,255,255,0.45)",
    background: tab === t ? "rgba(255,255,255,0.1)" : "transparent",
    transition: "all 0.15s",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={base}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/er-logo.png" alt="EarnedReach" style={{ width: "32px" }} />
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>Studio Dashboard</span>
        </div>
        <nav style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {(["overview", "clients", "tasks", "content", "enquiries"] as Tab[]).map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <a href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to site</a>
      </div>

      {/* Content */}
      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Overview</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
              <StatCard label="Active Clients" value={String(activeClients)} colour="#4ade80" />
              <StatCard label="Outstanding Tasks" value={String(pendingTasks)} colour="#f59e0b" />
              <StatCard label="Content In Progress" value={String(inEditContent)} colour="#6b9fff" />
              <StatCard label="New Enquiries" value={String(newEnquiries)} colour="#a78bfa" />
            </div>

            {/* Outstanding tasks */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <Card>
                <SectionTitle>Outstanding Tasks</SectionTitle>
                {tasks.filter(t => t.status !== "Done").length === 0
                  ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>All clear ✓</p>
                  : tasks.filter(t => t.status !== "Done").slice(0, 5).map(task => (
                    <div key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "2px" }}>{task.title}</div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{task.client} · Due {task.dueDate}</div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <Badge label={task.priority} colour={PRIORITY_COLOURS[task.priority]} />
                        <Badge label={task.assignee} colour="#6b9fff" />
                      </div>
                    </div>
                  ))
                }
              </Card>

              <Card>
                <SectionTitle>Content In Progress</SectionTitle>
                {content.filter(c => c.status !== "Delivered").length === 0
                  ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>Nothing in progress</p>
                  : content.filter(c => c.status !== "Delivered").map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "2px" }}>{item.title}</div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{item.client} · {item.type}</div>
                      </div>
                      <Badge label={item.status} colour={STATUS_COLOURS[item.status] || "#6b9fff"} />
                    </div>
                  ))
                }
              </Card>

              <Card>
                <SectionTitle>Active Clients</SectionTitle>
                {clients.filter(c => c.status === "Active").map(client => (
                  <div key={client.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "2px" }}>{client.name}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{client.service} · Since {client.startDate}</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#4ade80" }}>{client.value}</div>
                  </div>
                ))}
              </Card>

              <Card>
                <SectionTitle>New Enquiries</SectionTitle>
                {enquiries.filter(e => e.status === "New").length === 0
                  ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No new enquiries</p>
                  : enquiries.filter(e => e.status === "New").map(enq => (
                    <div key={enq.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 500 }}>{enq.name}</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{enq.date}</div>
                      </div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>{enq.email}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{enq.project.slice(0, 80)}{enq.project.length > 80 ? "…" : ""}</div>
                    </div>
                  ))
                }
              </Card>
            </div>
          </div>
        )}

        {/* ── CLIENTS ── */}
        {tab === "clients" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Clients</h1>
              <button onClick={() => setModal({ type: "client" })} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>+ Add Client</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {clients.map(client => (
                <Card key={client.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>{client.name}</span>
                      <Badge label={client.status} colour={STATUS_COLOURS[client.status]} />
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "4px" }}>{client.service} · Started {client.startDate}</div>
                    {client.notes && <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>{client.notes}</div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#4ade80" }}>{client.value}</span>
                    <button onClick={() => setModal({ type: "client", data: client })} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setClients(prev => prev.filter(c => c.id !== client.id))} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171", fontSize: "12px", cursor: "pointer" }}>Remove</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Outstanding Work</h1>
              <button onClick={() => setModal({ type: "task" })} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>+ Add Task</button>
            </div>
            {(["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => {
              const filtered = tasks.filter(t => t.status === status);
              if (filtered.length === 0) return null;
              return (
                <div key={status} style={{ marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Badge label={status} colour={STATUS_COLOURS[status]} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{filtered.length} task{filtered.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {filtered.map(task => (
                      <Card key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", padding: "16px 20px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{task.title}</div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{task.client} · Due {task.dueDate} · {task.assignee}</div>
                        </div>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <Badge label={task.priority} colour={PRIORITY_COLOURS[task.priority]} />
                          <button onClick={() => setModal({ type: "task", data: task })} style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                          <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))} style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171", fontSize: "12px", cursor: "pointer" }}>✕</button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CONTENT ── */}
        {tab === "content" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Content Queue</h1>
              <button onClick={() => setModal({ type: "content" })} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>+ Add Content</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {content.map(item => (
                <Card key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600 }}>{item.title}</span>
                      <Badge label={item.status} colour={STATUS_COLOURS[item.status] || "#6b9fff"} />
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>{item.client} · {item.type} · Due {item.dueDate}</div>
                    {item.notes && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{item.notes}</div>}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setModal({ type: "content", data: item })} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setContent(prev => prev.filter(c => c.id !== item.id))} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171", fontSize: "12px", cursor: "pointer" }}>Remove</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── ENQUIRIES ── */}
        {tab === "enquiries" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Enquiries</h1>
              <button onClick={() => setModal({ type: "enquiry" })} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>+ Add Enquiry</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {enquiries.map(enq => (
                <Card key={enq.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 600 }}>{enq.name}</span>
                      <Badge label={enq.status} colour={STATUS_COLOURS[enq.status]} />
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{enq.date}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "4px" }}>{enq.email} · {enq.phone}</div>
                    {enq.social && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>{enq.social}</div>}
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{enq.project}</div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setModal({ type: "enquiry", data: enq })} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setEnquiries(prev => prev.filter(e => e.id !== enq.id))} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171", fontSize: "12px", cursor: "pointer" }}>Remove</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {modal && (
        <ModalOverlay onClose={() => setModal(null)}>
          {modal.type === "client" && (
            <ClientForm
              initial={modal.data as Client | undefined}
              onSave={(c) => {
                setClients(prev => modal.data ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]);
                setModal(null);
              }}
              onClose={() => setModal(null)}
            />
          )}
          {modal.type === "task" && (
            <TaskForm
              initial={modal.data as Task | undefined}
              clients={clients}
              onSave={(t) => {
                setTasks(prev => modal.data ? prev.map(x => x.id === t.id ? t : x) : [...prev, t]);
                setModal(null);
              }}
              onClose={() => setModal(null)}
            />
          )}
          {modal.type === "content" && (
            <ContentForm
              initial={modal.data as ContentItem | undefined}
              clients={clients}
              onSave={(c) => {
                setContent(prev => modal.data ? prev.map(x => x.id === c.id ? c : x) : [...prev, c]);
                setModal(null);
              }}
              onClose={() => setModal(null)}
            />
          )}
          {modal.type === "enquiry" && (
            <EnquiryForm
              initial={modal.data as Enquiry | undefined}
              onSave={(e) => {
                setEnquiries(prev => modal.data ? prev.map(x => x.id === e.id ? e : x) : [...prev, e]);
                setModal(null);
              }}
              onClose={() => setModal(null)}
            />
          )}
        </ModalOverlay>
      )}
    </div>
  );
}

// ─── Modal Overlay ────────────────────────────────────────────────────────────
function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
    >
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f1628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Form helpers ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px",
};
const labelStyle: React.CSSProperties = { fontSize: "12px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px", display: "block" };
const saveBtn: React.CSSProperties = { width: "100%", padding: "12px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#3b5bff,#6b9fff)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "8px" };

function uid() { return Math.random().toString(36).slice(2, 10); }

function ClientForm({ initial, onSave, onClose }: { initial?: Client; onSave: (c: Client) => void; onClose: () => void }) {
  const [form, setForm] = useState<Client>(initial || { id: uid(), name: "", service: "", status: "Prospect", startDate: "", value: "", notes: "" });
  const f = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>{initial ? "Edit Client" : "Add Client"}</h3>
      <label style={labelStyle}>Name</label><input style={inputStyle} value={form.name} onChange={f("name")} placeholder="Client name" />
      <label style={labelStyle}>Service</label><input style={inputStyle} value={form.service} onChange={f("service")} placeholder="e.g. Brand Film" />
      <label style={labelStyle}>Status</label>
      <select style={{ ...inputStyle }} value={form.status} onChange={f("status")}>
        {["Prospect", "Active", "Delivered", "On Hold"].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <label style={labelStyle}>Start Date</label><input style={inputStyle} type="date" value={form.startDate} onChange={f("startDate")} />
      <label style={labelStyle}>Value</label><input style={inputStyle} value={form.value} onChange={f("value")} placeholder="e.g. £2,500 or £1,800/mo" />
      <label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.notes} onChange={f("notes")} placeholder="Any notes..." />
      <button style={saveBtn} onClick={() => onSave(form)}>Save</button>
      <button style={{ ...saveBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
    </div>
  );
}

function TaskForm({ initial, clients, onSave, onClose }: { initial?: Task; clients: Client[]; onSave: (t: Task) => void; onClose: () => void }) {
  const [form, setForm] = useState<Task>(initial || { id: uid(), title: "", client: clients[0]?.name || "", priority: "Medium", status: "To Do", dueDate: "", assignee: "David" });
  const f = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>{initial ? "Edit Task" : "Add Task"}</h3>
      <label style={labelStyle}>Task</label><input style={inputStyle} value={form.title} onChange={f("title")} placeholder="What needs doing?" />
      <label style={labelStyle}>Client</label>
      <select style={{ ...inputStyle }} value={form.client} onChange={f("client")}>
        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        <option value="Internal">Internal</option>
      </select>
      <label style={labelStyle}>Priority</label>
      <select style={{ ...inputStyle }} value={form.priority} onChange={f("priority")}>
        {["High", "Medium", "Low"].map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <label style={labelStyle}>Status</label>
      <select style={{ ...inputStyle }} value={form.status} onChange={f("status")}>
        {["To Do", "In Progress", "Done"].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <label style={labelStyle}>Due Date</label><input style={inputStyle} type="date" value={form.dueDate} onChange={f("dueDate")} />
      <label style={labelStyle}>Assignee</label>
      <select style={{ ...inputStyle }} value={form.assignee} onChange={f("assignee")}>
        {["David", "PJ", "Both"].map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <button style={saveBtn} onClick={() => onSave(form)}>Save</button>
      <button style={{ ...saveBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
    </div>
  );
}

function ContentForm({ initial, clients, onSave, onClose }: { initial?: ContentItem; clients: Client[]; onSave: (c: ContentItem) => void; onClose: () => void }) {
  const [form, setForm] = useState<ContentItem>(initial || { id: uid(), title: "", client: clients[0]?.name || "", type: "", status: "Raw Footage", dueDate: "", notes: "" });
  const f = (k: keyof ContentItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>{initial ? "Edit Content" : "Add Content"}</h3>
      <label style={labelStyle}>Title</label><input style={inputStyle} value={form.title} onChange={f("title")} placeholder="e.g. MJ EP4 — Full Cut" />
      <label style={labelStyle}>Client</label>
      <select style={{ ...inputStyle }} value={form.client} onChange={f("client")}>
        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <label style={labelStyle}>Type</label><input style={inputStyle} value={form.type} onChange={f("type")} placeholder="e.g. YouTube Episode, Short Form, Brand Film" />
      <label style={labelStyle}>Status</label>
      <select style={{ ...inputStyle }} value={form.status} onChange={f("status")}>
        {["Raw Footage", "In Edit", "Review", "Delivered"].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <label style={labelStyle}>Due Date</label><input style={inputStyle} type="date" value={form.dueDate} onChange={f("dueDate")} />
      <label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.notes} onChange={f("notes")} placeholder="Any notes..." />
      <button style={saveBtn} onClick={() => onSave(form)}>Save</button>
      <button style={{ ...saveBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
    </div>
  );
}

function EnquiryForm({ initial, onSave, onClose }: { initial?: Enquiry; onSave: (e: Enquiry) => void; onClose: () => void }) {
  const [form, setForm] = useState<Enquiry>(initial || { id: uid(), name: "", email: "", phone: "", social: "", project: "", date: new Date().toISOString().split("T")[0], status: "New" });
  const f = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>{initial ? "Edit Enquiry" : "Add Enquiry"}</h3>
      <label style={labelStyle}>Name</label><input style={inputStyle} value={form.name} onChange={f("name")} placeholder="Full name" />
      <label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={f("email")} placeholder="email@example.com" />
      <label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={f("phone")} placeholder="+44..." />
      <label style={labelStyle}>Social Handle</label><input style={inputStyle} value={form.social} onChange={f("social")} placeholder="@handle" />
      <label style={labelStyle}>Project Brief</label><textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.project} onChange={f("project")} placeholder="What are they looking for?" />
      <label style={labelStyle}>Date</label><input style={inputStyle} type="date" value={form.date} onChange={f("date")} />
      <label style={labelStyle}>Status</label>
      <select style={{ ...inputStyle }} value={form.status} onChange={f("status")}>
        {["New", "Contacted", "Qualified", "Closed"].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button style={saveBtn} onClick={() => onSave(form)}>Save</button>
      <button style={{ ...saveBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", marginTop: "8px" }} onClick={onClose}>Cancel</button>
    </div>
  );
}
