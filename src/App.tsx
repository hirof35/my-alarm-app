import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  // --- 状態管理 (Storage連携) ---
  const [alarmTime, setAlarmTime] = useState<string>(() => localStorage.getItem('alarmTime') || '');
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(() => localStorage.getItem('isAlarmActive') === 'true');
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [isRinging, setIsRinging] = useState<boolean>(false);
  const [isSnoozing, setIsSnoozing] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const snoozeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 通知許可の要求
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // localStorageへの保存
  useEffect(() => {
    localStorage.setItem('alarmTime', alarmTime);
    localStorage.setItem('isAlarmActive', String(isAlarmActive));
  }, [alarmTime, isAlarmActive]);

  // 時計とアラーム判定
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hmString = now.toTimeString().slice(0, 5);
      setCurrentTime(now.toLocaleTimeString());

      if (isAlarmActive && hmString === alarmTime && !isRinging && !isSnoozing) {
        triggerAlarm();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (snoozeTimerRef.current) clearTimeout(snoozeTimerRef.current);
    };
  }, [alarmTime, isAlarmActive, isRinging, isSnoozing]);

  const triggerAlarm = () => {
    setIsRinging(true);
    audioRef.current?.play().catch(() => console.log("再生にはユーザー操作が必要です"));

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("目覚まし時計", {
        body: `${alarmTime} です！`,
        requireInteraction: true,
        tag: "alarm-notif"
      });
    }
  };

  const handleStop = () => {
    setIsRinging(false);
    setIsAlarmActive(false);
    setIsSnoozing(false);
    if (snoozeTimerRef.current) clearTimeout(snoozeTimerRef.current);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const handleSnooze = () => {
    setIsRinging(false);
    setIsSnoozing(true);
    audioRef.current?.pause();
    snoozeTimerRef.current = setTimeout(() => {
      setIsSnoozing(false);
      triggerAlarm();
    }, 5 * 60 * 1000);
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>React Alarm</h1>
        <div style={styles.clock}>{currentTime}</div>

        <div style={styles.controls}>
          <input 
            type="time" 
            value={alarmTime} 
            onChange={(e) => setAlarmTime(e.target.value)}
            style={styles.input}
            disabled={isAlarmActive}
          />
          {!isAlarmActive ? (
            <button onClick={() => setIsAlarmActive(true)} style={styles.btnPrimary}>セット</button>
          ) : (
            <button onClick={handleStop} style={styles.btnDanger}>解除</button>
          )}
        </div>

        {isSnoozing && <p style={styles.status}>⏳ スヌーズ中...</p>}
        {isAlarmActive && !isRinging && !isSnoozing && <p style={styles.statusActive}>✅ アラーム待機中 ({alarmTime})</p>}

        {isRinging && (
          <div style={styles.alertBox}>
            <h2 style={{margin: 0}}>📢 起きて！</h2>
            <div style={{marginTop: '15px'}}>
              <button onClick={handleSnooze} style={styles.btnSnooze}>スヌーズ (5分)</button>
              <button onClick={handleStop} style={styles.btnStop}>止める</button>
            </div>
          </div>
        )}
      </div>
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" loop />
    </main>
  );
};

// 簡易スタイル
const styles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { padding: '40px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center' },
  title: { fontSize: '1.5rem', color: '#555', marginBottom: '10px' },
  clock: { fontSize: '4rem', fontWeight: 'bold', fontFamily: 'monospace', margin: '20px 0' },
  input: { fontSize: '1.5rem', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' },
  btnPrimary: { marginLeft: '10px', padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  btnDanger: { marginLeft: '10px', padding: '12px 24px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  status: { color: '#856404', fontWeight: 'bold' },
  statusActive: { color: '#28a745', fontWeight: 'bold' },
  alertBox: { marginTop: '20px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '12px', border: '2px solid #ffeeba' },
  btnSnooze: { padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' },
  btnStop: { padding: '10px 20px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default App;