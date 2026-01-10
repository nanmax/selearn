import { adminGetAllQuizAnalytics } from "@/app/data/admin/admin-get-quiz";
import { QuizAnalyticsContent } from "./_components/QuizAnalyticsContent";

export default async function QuizAnalyticsPage() {
  const analytics = await adminGetAllQuizAnalytics();

  return <QuizAnalyticsContent data={analytics} />;
}
