'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/ui/Navbar';
import { getRankMedal } from '@/lib/utils';
import api from '@/lib/api';
import type { LeaderboardEntry } from '@/types';

export default function LeaderboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [rankings, setRankings] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/login');
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    api.get('/leaderboard/global?limit=50').then((res) => setRankings(res.data.data || [])).finally(() => setLoading(false));
  }, [isAuthenticated]);

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main className="px-4 pt-4 pb-24 md:pb-8 md:px-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-black mb-1">
            <span className="gradient-text">Global</span>
            <span className="text-white"> Leaderboard</span>
          </h1>
          <p className="text-gray-500 text-sm mb-6">All players ranked by total fantasy points</p>

          {loading ? (
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => <div key={i} className="glass rounded-2xl h-16 shimmer" />)}
            </div>
          ) : rankings.length === 0 ? (
            <div className="text-center py-16 glass rounded-3xl">
              <div className="text-5xl mb-4">🏆</div>
              <p className="text-gray-400">No rankings yet — play a match!</p>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              {top3.length > 0 && (
                <div className="flex items-end justify-center gap-4 mb-8">
                  {/* 2nd place */}
                  {top3[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-3xl mb-2">{top3[1].avatar || '⚽'}</span>
                      <p className="text-xs font-semibold text-gray-300 mb-1 max-w-[80px] text-center truncate">{top3[1].name}</p>
                      <p className="text-sm font-black text-gray-300 mb-2">{top3[1].totalPoints}</p>
                      <div className="w-20 h-16 rounded-t-2xl flex items-center justify-center text-2xl font-black text-gray-400"
                        style={{ background: 'linear-gradient(180deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05))', border: '1px solid rgba(192,192,192,0.2)' }}>
                        🥈
                      </div>
                    </motion.div>
                  )}
                  {/* 1st place */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-6 h-6 text-gold-400 mb-1">👑</div>
                    <span className="text-4xl mb-2">{top3[0].avatar || '⚽'}</span>
                    <p className="text-xs font-bold text-white mb-1 max-w-[90px] text-center truncate">{top3[0].name}</p>
                    <p className="text-lg font-black gradient-text-gold mb-2">{top3[0].totalPoints}</p>
                    <div className="w-24 h-24 rounded-t-2xl flex items-center justify-center text-3xl"
                      style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05))', border: '1px solid rgba(255,215,0,0.3)' }}>
                      🥇
                    </div>
                  </motion.div>
                  {/* 3rd place */}
                  {top3[2] && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-3xl mb-2">{top3[2].avatar || '⚽'}</span>
                      <p className="text-xs font-semibold text-gray-300 mb-1 max-w-[80px] text-center truncate">{top3[2].name}</p>
                      <p className="text-sm font-black text-gray-500 mb-2">{top3[2].totalPoints}</p>
                      <div className="w-20 h-12 rounded-t-2xl flex items-center justify-center text-2xl"
                        style={{ background: 'linear-gradient(180deg, rgba(205,127,50,0.15), rgba(205,127,50,0.05))', border: '1px solid rgba(205,127,50,0.2)' }}>
                        🥉
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Full Rankings Table */}
              <div className="glass rounded-2xl overflow-hidden">
                {rankings.map((entry, idx) => {
                  const isMe = (entry.userId || entry.id) === user?.id;
                  return (
                    <motion.div
                      key={entry.userId || entry.id || idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className={`flex items-center gap-3 px-4 py-3.5 ${idx !== rankings.length - 1 ? 'border-b border-white/5' : ''} ${isMe ? 'bg-primary-500/5 border-l-2 border-l-primary-500' : ''}`}
                    >
                      <span className="w-8 text-center text-base">{getRankMedal(entry.rank)}</span>
                      <span className="text-xl">{entry.avatar || '⚽'}</span>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${isMe ? 'text-primary-300' : ''}`}>
                          {entry.name} {isMe && <span className="text-[10px] text-gray-500">(you)</span>}
                        </p>
                        <p className="text-xs text-gray-600">{entry.matchesPlayed || 0} matches</p>
                      </div>
                      <span className={`font-black text-base ${entry.rank <= 3 ? 'gradient-text-gold' : 'text-white'}`}>
                        {entry.totalPoints}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
