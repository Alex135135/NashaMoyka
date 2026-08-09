import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  // Добавляем настройку Turbopack для указания корневой директории
  turbopack: {
    root: path.join(process.cwd()), // Явно указываем корень проекта
  },
};

export default nextConfig;
