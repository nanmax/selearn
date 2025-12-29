"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Flame,
  BookOpen,
  Target,
  Star,
  MessageSquare,
  Award,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type BadgeData = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  isEarned: boolean;
  earnedAt: Date | null;
  progress: {
    current: number;
    max: number;
    percentage: number;
  };
};

type BadgesDataType = {
  badges: BadgeData[];
  byCategory: Record<string, BadgeData[]>;
  stats: {
    totalBadges: number;
    earnedBadges: number;
    totalPoints: number;
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
    learnedToday: boolean;
  };
};

const categoryLabels: Record<string, string> = {
  LEARNING: "Pembelajaran",
  QUIZ: "Quiz",
  ENGAGEMENT: "Keterlibatan",
  STREAK: "Streak",
  MILESTONE: "Milestone",
};

const categoryIcons: Record<string, typeof Trophy> = {
  LEARNING: BookOpen,
  QUIZ: Target,
  ENGAGEMENT: MessageSquare,
  STREAK: Flame,
  MILESTONE: Award,
};

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  flame: Flame,
  book: BookOpen,
  target: Target,
  star: Star,
  message: MessageSquare,
  award: Award,
};

interface BadgesContentProps {
  data: BadgesDataType;
}

export default function BadgesContent({ data }: BadgesContentProps) {
  const { badges, byCategory, stats, streak } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Achievement Badges</h1>
        <p className="text-muted-foreground">
          Raih badge dan tunjukkan pencapaianmu!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{stats.earnedBadges}</p>
            <p className="text-sm text-muted-foreground">Badge Diraih</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalBadges}</p>
            <p className="text-sm text-muted-foreground">Total Badge</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Flame
              className={cn(
                "w-8 h-8 mx-auto mb-2",
                streak.learnedToday ? "text-orange-500" : "text-gray-400"
              )}
            />
            <p className="text-2xl font-bold">{streak.currentStreak}</p>
            <p className="text-sm text-muted-foreground">Hari Streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{stats.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Poin dari Badge</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Learning Streak</h3>
              <p className="text-white/80 text-sm">
                {streak.learnedToday
                  ? "Kamu sudah belajar hari ini! Pertahankan streak-mu!"
                  : "Belajar hari ini untuk menjaga streak-mu!"}
              </p>
            </div>
            <div className="text-center">
              <Flame className="w-12 h-12 mx-auto mb-1" />
              <p className="text-3xl font-bold">{streak.currentStreak}</p>
              <p className="text-xs text-white/80">hari berturut-turut</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <Award className="w-4 h-4" />
            <span>Streak terpanjang: {streak.longestStreak} hari</span>
          </div>
        </CardContent>
      </Card>

      {/* Badges by Category */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          {Object.keys(byCategory).map((category) => {
            const CategoryIcon = categoryIcons[category] || Award;
            return (
              <TabsTrigger key={category} value={category}>
                <CategoryIcon className="w-4 h-4 mr-1" />
                {categoryLabels[category] || category}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </TabsContent>

        {Object.entries(byCategory).map(([category, categoryBadges]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeData }) {
  const IconComponent = iconMap[badge.icon] || Award;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all",
        badge.isEarned
          ? "border-yellow-400 bg-yellow-50/50"
          : "opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
      )}
    >
      {badge.isEarned && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      )}

      <CardHeader className="pb-2 text-center">
        <div
          className={cn(
            "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2",
            badge.isEarned
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-400"
          )}
        >
          {badge.isEarned ? (
            <IconComponent className="w-8 h-8" />
          ) : (
            <Lock className="w-8 h-8" />
          )}
        </div>
        <CardTitle className="text-base">{badge.name}</CardTitle>
      </CardHeader>

      <CardContent className="text-center space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {badge.description}
        </p>

        {badge.points > 0 && (
          <Badge variant="secondary" className="text-xs">
            +{badge.points} poin
          </Badge>
        )}

        {badge.isEarned ? (
          <p className="text-xs text-green-600">
            Diraih{" "}
            {badge.earnedAt
              ? format(new Date(badge.earnedAt), "d MMM yyyy", { locale: id })
              : ""}
          </p>
        ) : (
          <div className="space-y-1">
            <Progress value={badge.progress.percentage} className="h-1.5" />
            <p className="text-xs text-muted-foreground">
              {badge.progress.current}/{badge.progress.max}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
