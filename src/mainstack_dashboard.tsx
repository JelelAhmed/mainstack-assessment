import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// Types
interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

interface Transaction {
  amount: number;
  metadata?: {
    product_name?: string;
    name?: string;
  };
  type: "deposit" | "withdrawal";
  date: string;
  status: string;
  payment_reference?: string;
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};

const aggregateChartData = (transactions: Transaction[]) => {
  const dataMap = new Map();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const value =
      transaction.type === "deposit" ? transaction.amount : -transaction.amount;

    if (dataMap.has(date)) {
      dataMap.set(date, dataMap.get(date) + value);
    } else {
      dataMap.set(date, value);
    }
  });

  return Array.from(dataMap, ([date, revenue]) => ({ date, revenue }));
};

// SVG Icons
const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ArrowDownLeftIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="17" y1="7" x2="7" y2="17" />
    <polyline points="17 17 7 17 7 7" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ImageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Components
const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
  const navItems = [
    { icon: HomeIcon, label: "Home", active: false },
    { icon: AnalyticsIcon, label: "Analytics", active: false },
    { icon: AnalyticsIcon, label: "Revenue", active: true },
    { icon: UsersIcon, label: "CRM", active: false },
    { icon: GridIcon, label: "Apps", active: false },
  ];

  const initials = user ? `${user.first_name[0]}${user.last_name[0]}` : "U";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #EFF1F6",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>⬛</div>
        <div style={{ display: "flex", gap: "8px" }}>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: item.active ? "#131316" : "transparent",
                color: item.active ? "#FFFFFF" : "#56616B",
                border: "none",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            color: "#56616B",
          }}
        >
          <BellIcon />
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "none",
            alignItems: "center",
            color: "#56616B",
          }}
        >
          <MenuIcon />
        </button>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#131316",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {initials}
        </div>
      </div>
    </nav>
  );
};

const BalanceDisplay: React.FC<{ wallet: Wallet | null }> = ({ wallet }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        marginBottom: "32px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: "300px" }}>
        <p
          style={{
            fontSize: "14px",
            color: "#56616B",
            marginBottom: "8px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Available Balance
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {wallet ? formatCurrency(wallet.balance) : "$0.00"}
          </h1>
          <button
            style={{
              backgroundColor: "#131316",
              color: "#FFFFFF",
              padding: "12px 32px",
              border: "none",
              borderRadius: "100px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          minWidth: "200px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#56616B",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Ledger Balance
            </span>
            <InfoIcon />
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {wallet ? formatCurrency(wallet.ledger_balance) : "$0.00"}
          </p>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#56616B",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Total Payout
            </span>
            <InfoIcon />
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {wallet ? formatCurrency(wallet.total_payout) : "$0.00"}
          </p>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#56616B",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Total Revenue
            </span>
            <InfoIcon />
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {wallet ? formatCurrency(wallet.total_revenue) : "$0.00"}
          </p>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#56616B",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Pending Payout
            </span>
            <InfoIcon />
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {wallet ? formatCurrency(wallet.pending_payout) : "$0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

const RevenueChart: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const chartData = aggregateChartData(transactions);

  return (
    <div
      style={{
        marginBottom: "32px",
        padding: "24px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #EFF1F6",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#56616B", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #EFF1F6",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF5403"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const isDeposit = transaction.type === "deposit";
  const title = transaction.metadata?.product_name || "Transaction";
  const subtitle =
    transaction.metadata?.name || transaction.payment_reference || "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        borderBottom: "1px solid #EFF1F6",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: isDeposit ? "#E7F6EC" : "#FFF5F0",
            color: isDeposit ? "#0EA163" : "#FF5403",
          }}
        >
          {isDeposit ? <ArrowDownLeftIcon /> : <ArrowUpRightIcon />}
        </div>
        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#131316",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              style={{
                fontSize: "12px",
                color: "#56616B",
                margin: "2px 0 0 0",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#131316",
            margin: 0,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#56616B",
            margin: "2px 0 0 0",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {formatDate(transaction.date)}
        </p>
      </div>
    </div>
  );
};

const SidebarApps: React.FC = () => {
  const apps = [
    { icon: LinkIcon, name: "Link in Bio", color: "#FF5403" },
    { icon: ShoppingBagIcon, name: "Store", color: "#0EA163" },
    { icon: ImageIcon, name: "Media Kit", color: "#5B93FF" },
    { icon: FileTextIcon, name: "Invoicing", color: "#FF5403" },
    { icon: CalendarIcon, name: "Bookings", color: "#FFB800" },
  ];

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #EFF1F6",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#131316",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Apps
        </span>
        <ChevronDownIcon />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {apps.map((app, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: `${app.color}15`,
                color: app.color,
              }}
            >
              <app.icon />
            </div>
            <span
              style={{
                fontSize: "14px",
                color: "#131316",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const MainApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, walletRes, transactionsRes] = await Promise.all([
          fetch("https://fe-task-api.mainstack.io/user"),
          fetch("https://fe-task-api.mainstack.io/wallet"),
          fetch("https://fe-task-api.mainstack.io/transactions"),
        ]);

        if (!userRes.ok || !walletRes.ok || !transactionsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData = await userRes.json();
        const walletData = await walletRes.json();
        const transactionsData = await transactionsRes.json();

        setUser(userData);
        setWallet(walletData);
        setTransactions(transactionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "4px solid #EFF1F6",
            borderTopColor: "#FF5403",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
        }}
      >
        <p style={{ color: "#EF4444", fontFamily: "Inter, sans-serif" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar user={user} />

      <div
        style={{
          display: "flex",
          gap: "24px",
          padding: "32px",
          maxWidth: "1400px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "600px" }}>
          <BalanceDisplay wallet={wallet} />

          <RevenueChart transactions={transactions} />

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #EFF1F6",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px",
                borderBottom: "1px solid #EFF1F6",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#131316",
                    margin: 0,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {transactions.length} Transactions
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#56616B",
                    margin: "4px 0 0 0",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Your transactions for the last 7 days
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    color: "#56616B",
                    border: "none",
                    borderRadius: "100px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Filter
                  <ChevronDownIcon />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    color: "#56616B",
                    border: "none",
                    borderRadius: "100px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Export list
                  <DownloadIcon />
                </button>
              </div>
            </div>

            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {transactions.map((transaction, idx) => (
                <TransactionRow key={idx} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>

        <SidebarApps />
      </div>
    </div>
  );
};

export default MainApp;
