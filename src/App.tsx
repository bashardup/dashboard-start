import Layout from "./components/layout"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "./pages/dashboard-page"
import AnalyticsPage from "./pages/analytics-page"
import ResizableDashboardPage from "./pages/resizable-dashboard-page"
import LoginPattern from "./patterns/login"
import SignupPattern from "./patterns/signup"
import NotFoundPage from "./pages/not-found-page"
import ServicesListingPage from "./pages/services-listing-page"
import InquiryDetailPage from "./pages/inquiry-detail-page"
import InquiryFormPage from "./pages/inquiry-form-page"
import ServiceStatusPage from "./pages/service-status-page"
import ConfirmationPage from "./pages/confirmation-page"
import TransactionEnquiryPage from "./pages/transaction-enquiry-page"
import RequestDetailPage from "./pages/request-detail-page"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <>
      <Analytics />
      <Toaster />
      <Routes>
        {/* Standalone pages – no sidebar layout */}
        <Route path="/login" element={<LoginPattern />} />
        <Route path="/signup" element={<SignupPattern />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Dashboard pages – wrapped in Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/dashboards/resizable" element={<ResizableDashboardPage />} />

                <Route path="/services" element={<ServicesListingPage />} />
                <Route path="/services/inquiry" element={<InquiryDetailPage />} />
                <Route path="/services/inquiry/form" element={<InquiryFormPage />} />
                <Route path="/services/status" element={<ServiceStatusPage />} />
                <Route path="/services/confirmation" element={<ConfirmationPage />} />
                <Route path="/services/transaction-enquiry" element={<TransactionEnquiryPage />} />
                <Route path="/services/request-detail" element={<RequestDetailPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  )
}
