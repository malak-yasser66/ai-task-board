 import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, ArrowLeft, CheckCircle, Clock, ListTodo } from 'lucide-react';

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    icon: <ListTodo style={{ color: '#ff163e', filter: 'drop-shadow(0 8px 18px rgba(255,22,62,0.22))' }} size={22} />,
    accent: '#ff163e',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    icon: <Clock style={{ color: '#d1002a', filter: 'drop-shadow(0 8px 18px rgba(209,0,42,0.18))' }} size={22} />,
    accent: '#d1002a',
  },
  {
    id: 'done',
    title: 'Done',
    icon: <CheckCircle style={{ color: '#b00033', filter: 'drop-shadow(0 8px 18px rgba(176,0,51,0.16))' }} size={22} />,
    accent: '#b00033',
  },
];

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design the graphical interface', status: 'todo' },
    { id: '2', title: 'Connect State Management', status: 'in-progress' },
    { id: '3', title: 'Setup development environment', status: 'done' },
  ]);
  const [text, setText] = useState('');

  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now().toString(), title, status: 'todo' }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, status: newStatus } : task));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'done').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top left, rgba(255,22,62,0.24), transparent 18%), radial-gradient(circle at bottom right, rgba(192,12,42,0.18), transparent 22%), linear-gradient(180deg, #0f1724 0%, #141827 42%, #121622 100%)',
        fontFamily: 'system-ui, sans-serif',
        color: '#e8e8ee',
        padding: '42px 20px 60px',
      }}
    >
      <header style={{ maxWidth: '1120px', margin: '0 auto 32px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.35em', color: '#e6b6c6', fontSize: '0.85rem', marginBottom: '18px' }}>
            Dark Luxurious Workflow
          </p>
          <h1 style={{ fontSize: '3rem', lineHeight: 1.05, fontWeight: '800', margin: '0 auto 16px', maxWidth: '760px', color: '#f8fafc' }}>
            Elegant Burgundy AI Task Board
          </h1>
          <p style={{ color: '#b9b1c0', fontSize: '1.05rem', maxWidth: '760px', margin: '0 auto' }}>
            A premium dashboard with charcoal depth, rich burgundy accents, and a subtle neon glow for a luxury experience.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '18px', marginTop: '30px' }}>
          {[
            { label: 'Total Tasks', value: totalTasks, accent: '#800020' },
            { label: 'Completed', value: completedTasks, accent: '#6b0d24' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                minWidth: '190px',
                padding: '20px 24px',
                borderRadius: '22px',
                background: 'rgba(34, 44, 66, 0.98)',
                border: `1px solid ${stat.accent}66`,
                boxShadow: `0 36px 110px -40px ${stat.accent}88`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <span style={{ color: '#e4afb9', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.18em' }}>{stat.label}</span>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc' }}>{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </header>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '820px',
          margin: '0 auto 34px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a new task with premium detail..."
            style={{
              flex: 1,
              minWidth: '260px',
              padding: '16px 20px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(30, 40, 64, 0.98)',
              color: '#fff6f8',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 20px 64px -34px rgba(255,22,62,0.22)',
            }}
        />
        <button
          type="submit"
          style={{
            minWidth: '170px',
            padding: '16px 22px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff163e, #700012)',
            color: '#fffdfd',
            fontWeight: '900',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 26px 80px -36px rgba(255,22,62,0.36), 0 8px 30px -20px rgba(112,0,18,0.32)',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Add Task
        </button>
      </form>

      {/* Grid Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '1180px',
          margin: '0 auto',
        }}
      >
        {columns.map((col, index) => {
          const columnTasks = tasks.filter((task) => task.status === col.id);

          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              style={{
                background: '#18304a',
                borderRadius: '26px',
                border: '1px solid rgba(255,22,62,0.12)',
                boxShadow: '0 40px 130px -80px rgba(255,22,62,0.16)',
                padding: '28px',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '22px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '18px',
                    background: `${col.accent}22`,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {col.icon}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.32rem', fontWeight: '800', color: '#f8fafc' }}>{col.title}</h2>
                  <p style={{ margin: '6px 0 0', color: '#b7afc1', fontSize: '0.95rem' }}>{columnTasks.length} tasks</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
                <AnimatePresence>
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                        style={{
                        background: 'linear-gradient(180deg, rgba(28, 38, 60, 0.98) 0%, rgba(30, 42, 66, 0.96) 100%)',
                        border: '1px solid rgba(255,22,62,0.26)',
                        borderRadius: '20px',
                        padding: '22px',
                        boxShadow: '0 26px 70px -28px rgba(255,22,62,0.34)',
                        color: '#fff9fa',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '150px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: '600', lineHeight: 1.6, color: '#f8fafc' }}>{task.title}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: '22px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {col.id !== 'todo' && (
                            <button
                              type="button"
                              onClick={() => moveTask(task.id, col.id === 'done' ? 'in-progress' : 'todo')}
                              style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '16px',
                                border: '1px solid rgba(148, 163, 184, 0.18)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#d8c8d9',
                                cursor: 'pointer',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              <ArrowLeft size={16} />
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              type="button"
                              onClick={() => moveTask(task.id, col.id === 'todo' ? 'in-progress' : 'done')}
                              style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '16px',
                                border: '1px solid rgba(148, 163, 184, 0.18)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#d8c8d9',
                                cursor: 'pointer',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          style={{
                            width: '46px',
                            height: '46px',
                            display: 'grid',
                            placeItems: 'center',
                            borderRadius: '16px',
                            background: 'rgba(248, 113, 113, 0.14)',
                            border: '1px solid rgba(248, 113, 113, 0.24)',
                            color: '#fca5a5',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {columnTasks.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      marginTop: '10px',
                      padding: '28px',
                      borderRadius: '22px',
                      border: '2px dashed rgba(128, 0, 32, 0.55)',
                      background: 'rgba(18, 24, 38, 0.75)',
                      color: '#a8afbc',
                      textAlign: 'center',
                      minHeight: '170px',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#e8e8ee' }}>No tasks here yet</p>
                      <p style={{ margin: '10px 0 0', fontSize: '0.95rem', color: '#b7afc1' }}>Create a new task to populate this column.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 