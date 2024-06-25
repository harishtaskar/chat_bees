import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "remixicon/fonts/remixicon.css";
import RecoilRootProvider from "@/state/RecoilRootProvider";
import SocketProvider from "@/state/SocketProvider";
import RenderModal from "@/components/render-modal/RenderModal";
import ValidateDevice from "@/components/validations/ValidateDevice";
import ValidateNetwork from "@/components/validations/ValidateNetwork";
import "react-toastify/dist/ReactToastify.css";
import "dotenv/config";
import Theme from "@/components/shared/Theme";
import LocalToaster from "@/components/shared/LocalToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Bees",
  description: "anonymous chat application, random chat",
  icons: {
    icon: "/_next/static/media/metadata/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilRootProvider>
        <body className={inter.className}>
          <div className="hidden">
            <Theme id="theme" />
          </div>
          <RenderModal />
          <ValidateDevice />
          <SocketProvider>
            <main className="main">
              {children}
              <LocalToaster />
              <ValidateNetwork />
            </main>
          </SocketProvider>
        </body>
      </RecoilRootProvider>
    </html>
  );
}
