
import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const initialCampaigns = [
  {
    id: 1,
    name: "B.Tech AI Admissions",
    course: "Artificial Intelligence",
    leads: 250,
    completed: 184,
    interested: 42,
    status: "Completed",
  },
  {
    id: 2,
    name: "Computer Science Outreach",
    course: "Computer Science",
    leads: 400,
    completed: 276,
    interested: 61,
    status: "In Progress",
  },
  {
    id: 3,
    name: "MBA Admissions",
    course: "Business Administration",
    leads: 150,
    completed: 0,
    interested: 0,
    status: "Draft",
  },
];

const navigation = [
  { label: "Overview", icon: "▦" },
  { label: "Campaigns", icon: "◉" },
  { label: "Leads", icon: "♙" },
  { label: "Call History", icon: "↗" },
  { label: "AI Assistant", icon: "✳" },
];

const buttonStyle =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const inputStyle =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [apiStatus, setApiStatus] = useState("Checking");
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    course: "Artificial Intelligence",
    leads: "100",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then((data) => {
        setApiStatus(data.status === "healthy" ? "Connected" : "Unavailable");
      })
      .catch(() => setApiStatus("Offline"));
  }, []);

  const totalLeads = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.leads),
    0
  );

  const completedCalls = campaigns.reduce(
    (sum, campaign) => sum + campaign.completed,
    0
  );

  const interestedLeads = campaigns.reduce(
    (sum, campaign) => sum + campaign.interested,
    0
  );

  const filteredCampaigns = campaigns.filter((campaign) =>
    `${campaign.name} ${campaign.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function createCampaign(event) {
    event.preventDefault();

    setCampaigns((previous) => [
      {
        id: Date.now(),
        name: newCampaign.name.trim(),
        course: newCampaign.course,
        leads: Number(newCampaign.leads),
        completed: 0,
        interested: 0,
        status: "Draft",
      },
      ...previous,
    ]);

    setNewCampaign({
      name: "",
      course: "Artificial Intelligence",
      leads: "100",
    });

    setShowModal(false);
    setActivePage("Campaigns");
  }

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads.toLocaleString(),
      icon: "♙",
      color: "bg-blue-50 text-blue-600",
      note: "Across all campaigns",
    },
    {
      label: "Calls Completed",
      value: completedCalls.toLocaleString(),
      icon: "↗",
      color: "bg-emerald-50 text-emerald-600",
      note: "Simulated call results",
    },
    {
      label: "Interested Leads",
      value: interestedLeads.toLocaleString(),
      icon: "◎",
      color: "bg-violet-50 text-violet-600",
      note: "Based on demo data",
    },
    {
      label: "Campaigns",
      value: campaigns.length.toString(),
      icon: "▦",
      color: "bg-amber-50 text-amber-600",
      note: "All campaign statuses",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-7 lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-extrabold text-white shadow-lg shadow-indigo-200">
            V
          </div>
          <div>
          <h2 className="text-lg font-extrabold tracking-tight">
            AI<span className="text-indigo-600">calls</span>
          </h2>
            
            <p className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-slate-400">
              OUTREACH PLATFORM
            </p>
          </div>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-400">
          WORKSPACE
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activePage === item.label
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="w-6 text-center text-lg">{item.icon}</span>
              {item.label}
              {item.label === "Campaigns" && (
                <span className="ml-auto rounded-md bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                  {campaigns.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
            <div className="mb-3 grid size-9 place-items-center rounded-xl bg-white text-lg text-indigo-600 shadow-sm">
              ✳
            </div>
            <h3 className="text-sm font-bold">AI-powered outreach</h3>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Manage campaigns and understand student interests.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
            <div className="grid size-10 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              VR
            </div>
            <div>
              <p className="text-sm font-semibold">Workspace Admin</p>
              <p className="mt-0.5 text-xs text-slate-400">
                College Admissions
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="sticky top-0 z-10 flex min-h-[68px] items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-7">
          <div className="text-xs font-medium text-slate-500 sm:text-sm">
            Workspace <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-800">{activePage}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span
              className={`hidden items-center gap-2 text-xs font-medium sm:flex ${
                apiStatus === "Connected"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  apiStatus === "Connected"
                    ? "bg-emerald-500"
                    : "bg-amber-400"
                }`}
              />
              API {apiStatus}
            </span>

            <span className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-[9px] font-extrabold tracking-wider text-indigo-600 sm:text-[10px]">
              DEMO MODE
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-9">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-[10px] font-extrabold tracking-[0.18em] text-indigo-600">
                COLLEGE OUTREACH DASHBOARD
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {activePage === "Overview"
                  ? "Welcome to VoiceReach AI"
                  : activePage}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage campaigns, organize leads and track outreach results.
              </p>
            </div>

            <button
              className={buttonStyle}
              onClick={() => setShowModal(true)}
            >
              <span className="text-lg">＋</span> Create campaign
            </button>
          </section>

          {activePage === "AI Assistant" ||
          activePage === "Leads" ||
          activePage === "Call History" ? (
            <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
                {activePage === "AI Assistant"
                  ? "✳"
                  : activePage === "Leads"
                    ? "♙"
                    : "↗"}
              </div>
              <h2 className="text-xl font-bold">{activePage}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                {activePage === "AI Assistant"
                  ? "The AI admissions agent will answer course questions using official college information."
                  : "This module will be connected to your lead records and simulated call logs in the next development steps."}
              </p>
              <button
                className={`${buttonStyle} mt-6`}
                onClick={() => setActivePage("Overview")}
              >
                Back to overview
              </button>
            </section>
          ) : (
            <>
              <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-500">
                        {stat.label}
                      </span>
                      <div
                        className={`grid size-10 place-items-center rounded-xl text-xl ${stat.color}`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <p className="mt-4 text-3xl font-extrabold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">{stat.note}</p>
                  </article>
                ))}
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div>
                    <h2 className="text-base font-bold">
                      {activePage === "Campaigns"
                        ? "All campaigns"
                        : "Recent campaigns"}
                    </h2>
                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      Track the performance of your outreach campaigns.
                    </p>
                  </div>

                  <input
                    className={`${inputStyle} sm:max-w-xs`}
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left">
                    <thead className="border-y border-slate-100 bg-slate-50/80">
                      <tr>
                        {[
                          "CAMPAIGN",
                          "LEADS",
                          "COMPLETED",
                          "INTERESTED",
                          "PROGRESS",
                          "STATUS",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="px-5 py-3.5 text-[10px] font-bold tracking-wider text-slate-400 first:pl-6"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredCampaigns.map((campaign) => {
                        const progress =
                          campaign.leads > 0
                            ? Math.round(
                                (campaign.completed / campaign.leads) * 100
                              )
                            : 0;

                        const statusStyle = {
                          Completed: "bg-emerald-50 text-emerald-700",
                          "In Progress": "bg-amber-50 text-amber-700",
                          Draft: "bg-slate-100 text-slate-600",
                        };

                        return (
                          <tr
                            key={campaign.id}
                            className="transition hover:bg-slate-50/70"
                          >
                            <td className="px-5 py-4 first:pl-6">
                              <div className="flex items-center gap-3">
                                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-lg text-indigo-600">
                                  ↗
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    {campaign.name}
                                  </p>
                                  <p className="mt-1 text-[11px] text-slate-400">
                                    {campaign.course}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-xs text-slate-600">
                              {campaign.leads.toLocaleString()}
                            </td>
                            <td className="px-5 py-4 text-xs text-slate-600">
                              {campaign.completed.toLocaleString()}
                            </td>
                            <td className="px-5 py-4 text-xs text-slate-600">
                              {campaign.interested.toLocaleString()}
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className="h-full rounded-full bg-indigo-500 transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className="text-[11px] text-slate-500">
                                  {progress}%
                                </span>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${
                                  statusStyle[campaign.status] ||
                                  statusStyle.Draft
                                }`}
                              >
                                {campaign.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredCampaigns.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-12 text-center text-sm text-slate-400"
                          >
                            No campaigns found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
                  Showing {filteredCampaigns.length} of {campaigns.length}{" "}
                  campaigns
                </div>
              </section>

              <section className="mt-5 flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-white font-bold text-indigo-600 shadow-sm">
                  i
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Simulation environment
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Campaign figures are sample data. Creating a campaign does
                    not place real telephone calls. We will build the call
                    simulator next.
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <form
            onSubmit={createCampaign}
            className="my-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">Create campaign</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Set up a new college outreach campaign.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="grid size-9 place-items-center rounded-xl bg-slate-100 text-xl text-slate-500 hover:bg-slate-200"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-semibold text-slate-700">
                Campaign name
                <input
                  className={`${inputStyle} mt-2`}
                  required
                  maxLength={100}
                  placeholder="e.g. B.Tech 2027 Admissions"
                  value={newCampaign.name}
                  onChange={(event) =>
                    setNewCampaign({
                      ...newCampaign,
                      name: event.target.value,
                    })
                  }
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Course
                <select
                  className={`${inputStyle} mt-2`}
                  value={newCampaign.course}
                  onChange={(event) =>
                    setNewCampaign({
                      ...newCampaign,
                      course: event.target.value,
                    })
                  }
                >
                  <option>Artificial Intelligence</option>
                  <option>Computer Science</option>
                  <option>Business Administration</option>
                  <option>Data Science</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Number of test leads
                <input
                  className={`${inputStyle} mt-2`}
                  required
                  type="number"
                  min="1"
                  max="1000"
                  value={newCampaign.leads}
                  onChange={(event) =>
                    setNewCampaign({
                      ...newCampaign,
                      leads: event.target.value,
                    })
                  }
                />
                <span className="mt-2 block text-xs font-normal text-slate-400">
                  Demo limit: 1–1,000 test leads.
                </span>
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className={buttonStyle}>
                Create draft
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
