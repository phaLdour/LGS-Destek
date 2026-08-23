@echo off
chcp 65001 >nul
cd /d "C:\Users\PC1\Desktop\LGS-Destek"
echo Rekabet degisiklikleri commit + push ediliyor...
git add "src/app/rekabet/page.tsx" "src/app/rekabet/[matchId]/page.tsx" "src/app/rekabet/[matchId]/sonuc/page.tsx" "src/app/sozluk/page.tsx" "src/components/competitive/MatchResult.tsx" "src/components/competitive/RankCard.tsx" "src/lib/competitive/ranks.ts" "src/lib/competitive/scoring.ts" "src/lib/competitive/server.ts" "supabase/schema.sql" "src/app/rekabet/liderlik/page.tsx" "supabase/migrations/0002_valorant_mmr.sql"
git commit -m "Rekabet: Valorant tarzi MMR + rutbe sistemi + bug fix"
git push
echo.
echo === Bitti. Vercel otomatik deploy edecek. Bu pencereyi kapatabilirsin. ===
pause
