import { useState, useEffect } from "react"
import { supabase } from "./lib/supabase"
import DiabetesHome from "./components/diabetes/DiabetesHome"
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [screen, setScreen] = useState("home")
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [symptomHistory, setSymptomHistory] 
    = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
      })
  }, [])

  const sendOtp = async () => {
    const { error } = await supabase.auth
      .signInWithOtp({
        phone: `+91${phone}`
      })
    if (!error) setOtpSent(true)
    else alert("Error: " + error.message)
  }

  const verifyOtp = async () => {
    const { data, error } = await supabase
      .auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: "sms"
      })
    if (data.user) {
      setUser(data.user)
      setScreen("home")
    }
    else alert("Wrong OTP: " + error?.message)
  }

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return
    setLoading(true)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Aarogya AI, 
a knowledgeable and warm Indian 
healthcare assistant. 

User symptoms: ${symptoms}

Respond in EXACTLY this format:

🔍 POSSIBLE CONDITIONS:
List 2-3 most likely conditions 
in simple language with brief 
explanation of each.

⚠️ SEVERITY: 
State clearly: Mild / Moderate / Severe
Explain why in one line.

🏠 HOME REMEDIES:
Give 3-4 practical Indian home remedies
using easily available items like:
tulsi, ginger, haldi, nimbu, ajwain etc.
Only if Mild or Moderate.

⏰ WHAT TO DO NOW:
Step by step what user should do 
in next 24 hours.

👨‍⚕️ SEE DOCTOR IF:
List specific warning signs that 
mean they must see a doctor.
Only recommend immediate doctor 
visit if Severe.

Reply in same language as user.
Hindi symptoms = Hindi reply.
English symptoms = English reply.
Be warm, caring and specific.
Never be vague or generic.`
            }]
          }]
        })
      }
    )

    const data = await response.json()
    const aiResult = data.candidates?.[0]
      ?.content?.parts?.[0]?.text 
      || "Please consult a doctor."

    setResult(aiResult)

    if (user) {
      await supabase
        .from("symptom_checks")
        .insert({
          user_id: user.id,
          symptoms: symptoms,
          ai_response: aiResult,
          created_at: new Date()
        })

      loadHistory()
    }

    setLoading(false)
  }

  const loadHistory = async () => {
    if (!user) return
    const { data } = await supabase
      .from("symptom_checks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
    if (data) setSymptomHistory(data)
  }

  const styles: any = {
    container: {
      minHeight: "100vh",
      background: "#f0faf8",
      paddingBottom: "80px"
    },
    header: {
      background: 
        "linear-gradient(135deg,#00897B,#1A73E8)",
      padding: "20px",
      color: "white",
      textAlign: "center"
    },
    card: {
      background: "white",
      borderRadius: "16px",
      padding: "16px",
      margin: "12px 16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    },
    btn: {
      width: "100%",
      padding: "14px",
      background: 
        "linear-gradient(135deg,#00897B,#1A73E8)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px"
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      fontSize: "14px",
      boxSizing: "border-box" as const
    },
    bottomNav: {
      position: "fixed" as const,
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "430px",
      background: "white",
      borderTop: "1px solid #eee",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0"
    },
    navItem: (active: boolean) => ({
      textAlign: "center" as const,
      color: active ? "#00897B" : "#999",
      cursor: "pointer"
    })
  }

  if (screen === "login") return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>❤️ Aarogya AI</h2>
        <p style={{opacity:0.9, marginTop:"4px"}}>
          Login to save your health history
        </p>
      </div>
      <div style={styles.card}>
        <h3 style={{color:"#00897B",
          marginBottom:"16px"}}>
          📱 Phone Login
        </h3>
        {!otpSent ? (
          <>
            <div style={{
              display:"flex",
              alignItems:"center",
              border:"1px solid #ddd",
              borderRadius:"10px",
              overflow:"hidden",
              marginBottom:"10px"
            }}>
              <span style={{
                padding:"12px",
                background:"#f5f5f5",
                borderRight:"1px solid #ddd",
                color:"#333"
              }}>🇮🇳 +91</span>
              <input
                type="number"
                placeholder="Enter phone number"
                value={phone}
                onChange={e => 
                  setPhone(e.target.value)}
                style={{
                  flex:1,
                  padding:"12px",
                  border:"none",
                  fontSize:"14px",
                  outline:"none"
                }}
              />
            </div>
            <button 
              onClick={sendOtp} 
              style={styles.btn}>
              Send OTP 📲
            </button>
          </>
        ) : (
          <>
            <p style={{
              color:"#666",
              marginBottom:"12px",
              fontSize:"14px"
            }}>
              OTP sent to +91{phone}
            </p>
            <input
              type="number"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{
                ...styles.input,
                marginBottom:"10px"
              }}
            />
            <button 
              onClick={verifyOtp} 
              style={styles.btn}>
              Verify OTP ✅
            </button>
          </>
        )}
        <button
          onClick={() => setScreen("home")}
          style={{
            ...styles.btn,
            background:"#f5f5f5",
            color:"#666",
            marginTop:"8px"
          }}>
          Skip for now
        </button>
      </div>
      <SpeedInsights />
    </div>
  )

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <h2 style={{margin:0}}>❤️ Aarogya AI</h2>
          <div
            onClick={() => setScreen("login")}
            style={{
              cursor:"pointer",
              background:"rgba(255,255,255,0.2)",
              borderRadius:"50%",
              width:"36px",
              height:"36px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}>
            👤
          </div>
        </div>
        {screen === "home" && (
          <>
            <h1 style={{
              margin:"16px 0 4px",
              fontSize:"24px"
            }}>
              Namaste! 👋
            </h1>
            <p style={{opacity:0.9, fontSize:"14px"}}>
              Aapki Sehat, Hamari Zimmedari
            </p>
          </>
        )}
      </div>

      {screen === "home" && (
        <>
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"12px",
            margin:"16px"
          }}>
            {[
              {
                icon:"🩺",
                title:"Symptom Checker",
                sub:"Check instantly",
                bg:"linear-gradient(135deg,#00897B,#00BFA5)",
                screen:"symptoms"
              },
              {
                icon:"🧠",
                title:"Mental Health",
                sub:"Talk to AI",
                bg:"linear-gradient(135deg,#7C3AED,#A855F7)",
                screen:"mental"
              },
              {
                icon:"👨‍⚕️",
                title:"Find Doctor",
                sub:"Book now",
                bg:"linear-gradient(135deg,#1A73E8,#3B82F6)",
                screen:"doctor"
              },
              {
                icon:"🆘",
                title:"Emergency",
                sub:"Call 108",
                bg:"linear-gradient(135deg,#DC2626,#EF4444)",
                screen:"emergency"
              }
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => 
                  setScreen(card.screen)}
                style={{
                  background:card.bg,
                  borderRadius:"16px",
                  padding:"16px",
                  color:"white",
                  cursor:"pointer"
                }}>
                <div style={{fontSize:"28px"}}>
                  {card.icon}
                </div>
                <div style={{
                  fontWeight:"bold",
                  marginTop:"8px",
                  fontSize:"14px"
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontSize:"11px",
                  opacity:0.9
                }}>
                  {card.sub}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            ...styles.card,
            display:"flex",
            justifyContent:"space-around",
            textAlign:"center"
          }}>
            {[
              {num:"500+",label:"Doctors",
                color:"#00897B"},
              {num:"10K+",label:"Users",
                color:"#1A73E8"},
              {num:"4.8⭐",label:"Rating",
                color:"#F59E0B"}
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize:"20px",
                  fontWeight:"bold",
                  color:stat.color
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontSize:"12px",
                  color:"#666"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            ...styles.card,
            background:"#FFFBEB",
            border:"1px solid #FDE68A"
          }}>
            <h3 style={{
              color:"#F59E0B",
              marginBottom:"8px"
            }}>
              💡 Health Tip
            </h3>
            <p style={{
              fontSize:"13px",
              color:"#333"
            }}>
              Drink 8 glasses of water daily. 
              Exercise 30 min daily reduces 
              disease risk by 30%. 
              दिन में 8 गिलास पानी पिएं।
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={{
              color:"#333",
              marginBottom:"12px"
            }}>
              How are you feeling today?
            </h3>
            <div style={{
              display:"flex",
              justifyContent:"space-around"
            }}>
              {["😊","😐","😢","😰","😤"]
                .map((emoji) => (
                <div
                  key={emoji}
                  onClick={() => {
                    setMood(emoji)
                    setScreen("mental")
                  }}
                  style={{
                    fontSize:"32px",
                    cursor:"pointer",
                    padding:"8px",
                    borderRadius:"50%",
                    background: mood === emoji 
                      ? "#f0faf8" : "transparent",
                    border: mood === emoji 
                      ? "2px solid #00897B" 
                      : "2px solid transparent"
                  }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {screen === "symptoms" && (
        <div style={styles.card}>
          <h3 style={{
            color:"#00897B",
            marginBottom:"12px"
          }}>
            🩺 Symptom Checker
          </h3>
          <textarea
            value={symptoms}
            onChange={e => 
              setSymptoms(e.target.value)}
            placeholder=
              "Describe symptoms in Hindi or English...
Mujhe bukhaar hai aur sar dard hai"
            style={{
              ...styles.input,
              minHeight:"100px",
              resize:"none" as const
            }}
          />
          <button
            onClick={analyzeSymptoms}
            disabled={loading}
            style={styles.btn}>
            {loading 
              ? "Analyzing... ⏳" 
              : "Get Analysis 🔍"}
          </button>
          {result && (
            <div style={{
              marginTop:"12px",
              padding:"12px",
              background:"#f0faf8",
              borderRadius:"10px",
              fontSize:"13px",
              lineHeight:"1.6"
            }}>
              {result}
              <p style={{
                fontSize:"11px",
                color:"#888",
                marginTop:"8px"
              }}>
                ⚕️ General info only. 
                Please consult a doctor.
              </p>
            </div>
          )}
          {user && symptomHistory.length > 0 && (
            <div style={{marginTop:"16px"}}>
              <h4 style={{color:"#666",
                marginBottom:"8px"}}>
                Recent History:
              </h4>
              {symptomHistory.map((h,i) => (
                <div key={i} style={{
                  padding:"8px",
                  background:"#f5f5f5",
                  borderRadius:"8px",
                  marginBottom:"6px",
                  fontSize:"12px"
                }}>
                  <strong>{h.symptoms}</strong>
                  <p style={{
                    color:"#666",
                    margin:"4px 0 0"
                  }}>
                    {new Date(h.created_at)
                      .toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {screen === "mental" && (
        <div style={styles.card}>
          <h3 style={{
            color:"#7C3AED",
            marginBottom:"8px"
          }}>
            🧠 Mental Health Support
          </h3>
          <p style={{
            fontSize:"13px",
            color:"#666",
            marginBottom:"12px"
          }}>
            You are not alone. 
            Aap akele nahi hain. 💜
          </p>
          <textarea
            value={symptoms}
            onChange={e => 
              setSymptoms(e.target.value)}
            placeholder=
              "How are you feeling emotionally? 
Tell me anything..."
            style={{
              ...styles.input,
              minHeight:"100px",
              resize:"none" as const
            }}
          />
          <button
            onClick={analyzeSymptoms}
            disabled={loading}
            style={{
              ...styles.btn,
              background:
                "linear-gradient(135deg,#7C3AED,#A855F7)"
            }}>
            {loading 
              ? "Thinking... 💭" 
              : "Talk to AI 💬"}
          </button>
          {result && (
            <div style={{
              marginTop:"12px",
              padding:"12px",
              background:"#faf5ff",
              borderRadius:"10px",
              fontSize:"13px",
              lineHeight:"1.6"
            }}>
              {result}
            </div>
          )}
          <div style={{
            marginTop:"16px",
            padding:"12px",
            background:"#FEF2F2",
            borderRadius:"10px"
          }}>
            <p style={{
              fontSize:"12px",
              fontWeight:"bold",
              color:"#DC2626",
              marginBottom:"6px"
            }}>
              Crisis Helplines:
            </p>
            <p style={{
              fontSize:"12px",
              margin:"3px 0"
            }}>
              📞 iCall: 9152987821
            </p>
            <p style={{
              fontSize:"12px",
              margin:"3px 0"
            }}>
              📞 Vandrevala: 1860-2662-345
            </p>
          </div>
        </div>
      )}

      {screen === "doctor" && (
        <div style={styles.card}>
          <h3 style={{
            color:"#1A73E8",
            marginBottom:"16px"
          }}>
            👨‍⚕️ Find Doctor
          </h3>
          {[
            {
              name:"Dr. Priya Sharma",
              spec:"General Physician",
              fee:"₹300",
              rating:"4.9",
              available:true
            },
            {
              name:"Dr. Rahul Verma",
              spec:"Cardiologist",
              fee:"₹500",
              rating:"4.8",
              available:true
            },
            {
              name:"Dr. Anjali Singh",
              spec:"Dermatologist",
              fee:"₹400",
              rating:"4.7",
              available:false
            },
            {
              name:"Dr. Amit Kumar",
              spec:"Diabetologist",
              fee:"₹450",
              rating:"4.9",
              available:true
            }
          ].map((doc) => (
            <div key={doc.name} style={{
              padding:"12px",
              border:"1px solid #e0e0e0",
              borderRadius:"12px",
              marginBottom:"10px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>
              <div>
                <div style={{
                  fontWeight:"bold",
                  fontSize:"14px"
                }}>
                  {doc.name}
                </div>
                <div style={{
                  fontSize:"12px",
                  color:"#666"
                }}>
                  {doc.spec}
                </div>
                <div style={{
                  fontSize:"12px",
                  color:"#F59E0B"
                }}>
                  ⭐ {doc.rating} • {doc.fee}
                </div>
              </div>
              <button style={{
                padding:"8px 12px",
                background: doc.available 
                  ? "#00897B" : "#ccc",
                color:"white",
                border:"none",
                borderRadius:"8px",
                fontSize:"12px",
                cursor: doc.available 
                  ? "pointer" : "default"
              }}>
                {doc.available 
                  ? "Book" : "Busy"}
              </button>
            </div>
          ))}
        </div>
      )}

      {screen === "emergency" && (
        <div style={styles.card}>
          <h3 style={{
            color:"#DC2626",
            marginBottom:"16px"
          }}>
            🚨 Emergency Help
          </h3>
          {[
            {
              icon:"🚑",
              label:"Ambulance",
              num:"108",
              color:"#DC2626"
            },
            {
              icon:"📞",
              label:"Emergency",
              num:"112",
              color:"#1A73E8"
            },
            {
              icon:"🧠",
              label:"Mental Health iCall",
              num:"9152987821",
              color:"#7C3AED"
            },
            {
              icon:"❤️",
              label:"Vandrevala Foundation",
              num:"1860-2662-345",
              color:"#00897B"
            }
          ].map((item) => (
            <a
              key={item.num}
              href={`tel:${item.num}`}
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"14px",
                background:`${item.color}15`,
                border:`1px solid ${item.color}30`,
                borderRadius:"12px",
                marginBottom:"10px",
                textDecoration:"none"
              }}>
              <div>
                <div style={{
                  fontWeight:"bold",
                  color:item.color
                }}>
                  {item.icon} {item.label}
                </div>
                <div style={{
                  fontSize:"18px",
                  fontWeight:"bold",
                  color:"#333"
                }}>
                  {item.num}
                </div>
              </div>
              <span style={{
                color:item.color,
                fontSize:"20px"
              }}>
                📲
              </span>
            </a>
          ))}
        </div>
      )}

      {screen === "profile" && (
        <div style={styles.card}>
          <h3 style={{
            color:"#00897B",
            marginBottom:"16px"
          }}>
            👤 My Profile
          </h3>
          {user ? (
            <>
              <p style={{fontSize:"14px"}}>
                📱 Phone: {user.phone}
              </p>
              <p style={{
                fontSize:"14px",
                marginTop:"8px"
              }}>
                ✅ Account verified
              </p>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  setUser(null)
                }}
                style={{
                  ...styles.btn,
                  background:"#EF4444",
                  marginTop:"16px"
                }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <p style={{
                color:"#666",
                fontSize:"14px",
                marginBottom:"12px"
              }}>
                Login to save your health 
                history and appointments!
              </p>
              <button
                onClick={() => 
                  setScreen("login")}
                style={styles.btn}>
                Login with Phone 📱
              </button>
            </>
          )}
        </div>
      )}

      <div style={styles.bottomNav}>
        {[
          {icon:"🏠",label:"Home",s:"home"},
          {icon:"🩺",label:"Symptoms",
            s:"symptoms"},
          {icon:"👨‍⚕️",label:"Doctor",s:"doctor"},
          {icon:"🧠",label:"Mental",s:"mental"},
          {icon:"👤",label:"Profile",s:"profile"}
        ].map((item) => (
          <div
            key={item.s}
            onClick={() => setScreen(item.s)}
            style={styles.navItem(
              screen === item.s
            )}>
            <div style={{fontSize:"20px"}}>
              {item.icon}
            </div>
            <div style={{fontSize:"10px"}}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <SpeedInsights />
    </div>
  )
}