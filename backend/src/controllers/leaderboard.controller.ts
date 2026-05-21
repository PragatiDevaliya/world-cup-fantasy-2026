import prisma from '../lib/prisma';
import { Request, Response, NextFunction } from 'express';


export const getGlobalLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = '1', limit = '50' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true, name: true, avatar: true, totalPoints: true,
          _count: { select: { fantasyTeams: true } },
        },
        orderBy: { totalPoints: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.user.count(),
    ]);

    const ranked = users.map((u, idx) => ({
      ...u,
      userId: u.id,
      rank: skip + idx + 1,
      matchesPlayed: u._count.fantasyTeams,
    }));

    res.json({
      success: true,
      data: ranked,
      pagination: { total, page: parseInt(page as string), limit: parseInt(limit as string), pages: Math.ceil(total / parseInt(limit as string)) },
    });
  } catch (err) {
    next(err);
  }
};

export const getMatchLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { matchId } = req.params;

    const teams = await prisma.fantasyTeam.findMany({
      where: { matchId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { totalPoints: 'desc' },
    });

    const ranked = teams.map((t, idx) => ({
      rank: idx + 1,
      userId: t.user.id,
      name: t.user.name,
      avatar: t.user.avatar,
      totalPoints: t.totalPoints,
      teamId: t.id,
    }));

    res.json({ success: true, data: ranked });
  } catch (err) {
    next(err);
  }
};

export const getLeagueLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { leagueId } = req.params;

    const members = await prisma.leagueMember.findMany({
      where: { leagueId },
      include: {
        user: {
          select: {
            id: true, name: true, avatar: true,
            fantasyTeams: { select: { totalPoints: true } },
          },
        },
      },
    });

    const ranked = members
      .map((m) => ({
        userId: m.user.id,
        name: m.user.name,
        avatar: m.user.avatar,
        totalPoints: m.user.fantasyTeams.reduce((sum, t) => sum + t.totalPoints, 0),
        matchesPlayed: m.user.fantasyTeams.length,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((u, idx) => ({ ...u, rank: idx + 1 }));

    res.json({ success: true, data: ranked });
  } catch (err) {
    next(err);
  }
};
