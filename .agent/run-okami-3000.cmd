@echo off
cd /d D:\MyProjects\WebPortfolio\apps\okami-ramen
node_modules\.bin\next.CMD dev --turbopack --port 3000 1>D:\MyProjects\WebPortfolio\.agent\run-logs\okami-ramen-3000.log 2>D:\MyProjects\WebPortfolio\.agent\run-logs\okami-ramen-3000.err.log
