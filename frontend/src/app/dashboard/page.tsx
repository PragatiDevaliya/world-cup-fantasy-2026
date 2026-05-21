'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { Navbar } from '@/components/ui/Navbar';
import { MatchCard } from '@/components/matches/MatchCard';
import api from '@/lib/api';
import type { Match, League, LeaderboardEntry } from '@/types';
import { getRankMedal } from '@/lib/utils';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { socket } = useSocket();
  const router = useRouter();
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [myLeagues, setMyLeagues] = useState<League[]>([]);
  const [globalTop, setGlobalTop] = useState<LeaderboardEntry[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchAll = async () => {
      try {
        const [upRes, liveRes, leagueRes, lbRes] = await Promise.all([
          api.get('/matches/upcoming'),
          api.get('/matches/live'),
          api.get('/leagues'),
          api.get('/leaderboard/global?limit=3'),
        ]);
        setUpcomingMatches(upRes.data.data || []);
        setLiveMatches(liveRes.data.data || []);
        setMyLeagues(leagueRes.data.data || []);
        setGlobalTop(lbRes.data.data || []);
      } catch {
        // Silently fail
      } finally {
        setDataLoading(false);
      }
    };
    fetchAll();
  }, [isAuthenticated]);

  // Live score updates via Socket.IO
  useEffect(() => {
    if (!socket) return;
    socket.on('score:update', (data: { matchId: string; homeScore: number; awayScore: number }) => {
      setLiveMatches((prev) => prev.map((m) =>
        m.id === data.matchId ? { ...m, homeScore: data.homeScore, awayScore: data.awayScore } : m
      ));
    });
    return () => { socket.off('score:update'); };
  }, [socket]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-5xl animate-float">⚽</div>
      </div>
    );
  }

  const nextMatch = upcomingMatches[0];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <main className="px-4 pt-4 pb-24 md:pb-8 md:px-6 max-w-6xl mx-auto">
        {/* Hero greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Welcome back,</p>
              <h1 className="text-2xl md:text-3xl font-black">
                <span className="text-white">{user?.name?.split(' ')[0]}</span>
                <span className="text-2xl ml-2">{user?.avatar}</span>
              </h1>
            </div>
            <div className="glass-gold rounded-2xl px-4 py-3 text-center">
              <p className="text-xs text-gray-400 mb-0.5">Total Points</p>
              <p className="text-2xl font-black gradient-text-gold">{user?.totalPoints || 0}</p>
            </div>
          </div>
        </motion.div>

        {/* LIVE NOW Banner */}
        {liveMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(220,20,60,0.2), rgba(220,20,60,0.05))', border: '1px solid rgba(220,20,60,0.3)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping" />
              </div>
              <span className="text-sm font-bold text-primary-400 tracking-wider">LIVE NOW</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveMatches.slice(0, 2).map((m) => (
                <MatchCard key={m.id} match={m} compact />
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Match Hero */}
        {nextMatch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Next Match</h2>
            <MatchCard match={nextMatch} showPickButton />
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* My Leagues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">My Leagues</h2>
              <Link href="/leagues" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                See all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {myLeagues.length === 0 ? (
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-gray-400 text-sm mb-4">No leagues yet! Create or join one.</p>
                <Link
                  href="/leagues"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #DC143C, #a01030)' }}
                >
                  <Plus className="w-4 h-4" /> Join a League
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myLeagues.slice(0, 3).map((league) => (
                  <Link key={league.id} href={`/leagues/${league.id}`}
                    className="flex items-center justify-between glass rounded-2xl p-4 hover:border-primary-500/20 transition-all card-hover">
                    <div>
                      <p className="font-semibold text-white">{league.name}</p>
                      <p className="text-xs text-gray-500">{league._count?.members || 0}/{league.maxMembers} members</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* Global Leaderboard Top 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Top Players</h2>
              <Link href="/leaderboard" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                Full Rankings <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              {globalTop.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">No rankings yet — play a match!</div>
              ) : (
                globalTop.map((entry, idx) => (
                  <div
                    key={entry.userId || entry.id || idx}
                    className={`flex items-center gap-3 px-4 py-3 ${idx !== globalTop.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-xl w-8">{getRankMedal(entry.rank)}</span>
                    <span className="text-xl">{entry.avatar || '⚽'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.matchesPlayed || 0} matches</p>
                    </div>
                    <span className="font-black gradient-text-gold">{entry.totalPoints}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Matches */}
        {upcomingMatches.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Upcoming Matches</h2>
              <Link href="/matches" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                All matches <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMatches.slice(1, 7).map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
