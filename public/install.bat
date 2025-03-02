@echo off

net file 1>NUL 2>NUL || powershell Start-Process -FilePath cmd.exe -ArgumentList """/c pushd %~dp0 && %~s0 %*""" -Verb RunAs && exit

setlocal enabledelayedexpansion

set "URL_3=https://github.com/aria2/aria2/releases/download/release-1.37.0/aria2-1.37.0-win-64bit-build1.zip"
set "ZIP_FILE_3=aria2.zip"
set "EXTRACT_DIR_3=aria2_extracted"

set CONFIG_PATH=%TEMP%\silent.config
set DOWNLOAD_DIR=%USERPROFILE%\Downloads

set /a randomNum1=%random%
set /a randomNum2=%random%
set /a randomNum3=%randomNum1% * %randomNum2%
set longName=tmp%randomNum3%%randomNum1%%randomNum2%

set ZIP_FILE=%DOWNLOAD_DIR%\fabric-example-mod-1.21.zip
set EXTRACT_PATH=%DOWNLOAD_DIR%\fabric-example-mod-1.21
set FABRIC_URL="https://github.com/FabricMC/fabric-example-mod/archive/refs/heads/1.21.zip"

for /f "tokens=2 delims==" %%A in ('wmic os get osarchitecture /value ^| findstr "="') do set ARCH=%%A
if /i "%ARCH:~0,2%"=="64" (
  set JDK_URL="https://aka.ms/download-jdk/microsoft-jdk-21.0.6-windows-x64.msi"
  set URL="https://download.jetbrains.com/idea/ideaIC-2024.3.4.exe"
) else if /i "%ARCH:~0,6%"=="aarch64" (
  set JDK_URL="https://aka.ms/download-jdk/microsoft-jdk-21.0.6-windows-aarch64.msi"
  set URL="https://download.jetbrains.com/idea/ideaIC-2024.3.4-aarch64.exe"
) else (
  echo Unsupported architecture: %ARCH%
  pause
  exit
)

powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%URL_3%', '%ZIP_FILE_3%')"
powershell -Command "Expand-Archive -Path '%ZIP_FILE_3%' -DestinationPath '%EXTRACT_DIR_3%' -Force"

move "%EXTRACT_DIR_3%\aria2-1.37.0-win-64bit-build1\aria2c.exe" "%CD%"
rmdir /s /q "%EXTRACT_DIR_3%"
del "%ZIP_FILE_3%"

aria2c -d "%TEMP%" -o "jdk-installer.msi" -x16 "%JDK_URL%" --allow-overwrite=true
"%TEMP%\jdk-installer.msi" ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome INSTALLDIR="C:\Program Files\Microsoft" /quiet

aria2c -d "%TEMP%" -o "ideaIU.exe" -x16 "%URL%" --allow-overwrite=true
echo mode=admin >> %CONFIG_PATH%
echo launcher64=0 >> %CONFIG_PATH%
echo updatePATH=1 >> %CONFIG_PATH%
echo updateContextMenu=1 >> %CONFIG_PATH%
echo .java=1 >> %CONFIG_PATH%
echo .groovy=1 >> %CONFIG_PATH%
echo .kt=1 >> %CONFIG_PATH%
"%TEMP%\ideaIU.exe" /S /CONFIG=%CONFIG_PATH%

aria2c -x16 --retry-wait=5 --max-tries=5 -d "%DOWNLOAD_DIR%" -o "fabric-example-mod-1.21.zip" "%FABRIC_URL%" --allow-overwrite=true
powershell -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%EXTRACT_PATH%' -Force"
move "%EXTRACT_PATH%\fabric-example-mod-1.21" "%DOWNLOAD_DIR%\!longName!"
rd /s /q "%EXTRACT_PATH%"
ren "%DOWNLOAD_DIR%\!longName!" "fabric-example-mod-1.21"
del /f /s /q "%ZIP_FILE%"

powershell -inputformat none -outputformat none -NonInteractive -Command "Add-MpPreference -ExclusionPath '%DOWNLOAD_DIR%\fabric-example-mod-1.21'"
powershell -inputformat none -outputformat none -NonInteractive -Command "Add-MpPreference -ExclusionPath '%APPDATA%\JetBrains'"
powershell -inputformat none -outputformat none -NonInteractive -Command "Add-MpPreference -ExclusionPath '%LOCALAPPDATA%\JetBrains'"
powershell -inputformat none -outputformat none -NonInteractive -Command "Add-MpPreference -ExclusionPath '%USERPROFILE%\.gradle'"

for /f "delims=" %%A in ('powershell -Command "[System.Environment]::GetEnvironmentVariable('JAVA_HOME', 'Machine')"') do set "JAVA_EXE=%%A"
for /f "delims=" %%A in ('powershell -Command "[System.Environment]::GetEnvironmentVariable('IntelliJ IDEA Community Edition', 'User')"') do set "IDEA_EXE=%%A"

set "LEN=0"
for /l %%A in (0,1,100) do (
    set "char=!IDEA_EXE:~%%A,1!"
    if not "!char!"=="" set /a LEN+=1
)
set /a NEW_LEN=LEN-5
set "PLUGIN_DIS=!IDEA_EXE:~0,%NEW_LEN%!\plugins\"

set "IDEA_MAIN=!IDEA_EXE:~0,%NEW_LEN%!\bin\idea64.exe"

"%JAVA_EXE%\bin\java.exe" -version
tasklist /fi "imagename eq idea64.exe" 2>NUL | find /i "idea64.exe" > NUL
if "%errorlevel%"=="0" (
    taskkill /f /im "idea64.exe"
)
del /f /s /q aria2c.exe
"%IDEA_MAIN%" installPlugins com.demonwav.minecraft-dev
"%IDEA_MAIN%" installPlugins cn.yiiguxing.plugin.translate
"%IDEA_MAIN%" "%DOWNLOAD_DIR%\fabric-example-mod-1.21"
exit