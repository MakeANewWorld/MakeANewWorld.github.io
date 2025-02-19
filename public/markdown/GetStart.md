# 你好

本指南適用於完全沒有電腦基礎的使用者，並且專門針對 Windows 平台。

## 1. 安裝 JDK 21（Microsoft 提供）

Microsoft 的 JDK 內建 OpenGL 庫，適合我們的需求。

1. **下載 JDK 21**：
   - 進入 [Microsoft OpenJDK 官網](https://learn.microsoft.com/en-us/java/openjdk/download)。
   - 找到 `Windows x64 .msi` 版本的 **JDK 21**，下載 `.msi` 安裝檔。

2. **安裝 JDK**：
   - 執行剛剛下載的 `.msi` 檔案。
   - 點擊 `Next`。
   - 詳細閱讀並同意使用者條款後，勾選 `I accept the terms in the License Agreement`，並點擊 `Next`。
   - 點擊 `Next`。

3. **確認 JDK 是否成功安裝**：
   - 按 `Win + R`，輸入 `cmd`，按 `Enter`。
   - 輸入以下指令檢查 JDK 版本：
     ```sh
     java -version
     ```
   - 你應該會看到類似 `openjdk version "21"` 的輸出。

## 2. 安裝 JetBrains Runtime（DCEVM）

DCEVM 允許在 Java 進程運行時重新載入修改過的類，而 **JetBrains Runtime** 提供了最相容的環境。

1. **下載 JetBrains Runtime**：
   - 進入 [JetBrains Runtime 下載頁面](https://github.com/JetBrains/JetBrainsRuntime/releases)。
   - 下載 `windows-x64 JBR (vanilla)` 的 `.zip` 檔案，例如：
     ```
     jbr-21.0.6-windows-x64-b872.85.zip
     ```

2. **解壓縮並設定**：
   - 把 `.zip` 解壓縮到 `C:\JetBrains\jbr_dcevm`（可自行選擇路徑）。
   - 在 `環境變數` 中新增 `JAVA_HOME`，值設為 `C:\JetBrains\jbr_dcevm`。
   - 編輯 `Path` 變數，新增 `C:\JetBrains\jbr_dcevm\bin`。

3. **確認 JBR 是否成功安裝**：
   - 打開 `cmd`，輸入：
     ```sh
     java -version
     ```
   - 你應該會看到 `JetBrains Runtime` 相關訊息。

## 3. 安裝 Fabric（開發環境）

Fabric Loom 會自動下載，不需要手動安裝 Gradle。

1. **建立 Fabric 開發專案**：
   - 在 `cmd` 中執行：
     ```sh
     git clone https://github.com/FabricMC/fabric-example-mod.git
     cd fabric-example-mod
     ```

2. **設定 IntelliJ IDEA**：
   - 在 IntelliJ IDEA（免費版）中開啟 `fabric-example-mod` 專案。
   - 選擇 `File` → `Project Structure` → `Project`，將 `Gradle JVM` 設為 `JetBrains Runtime`。

3. **生成 IntelliJ 執行設定**：
   - 在 `cmd`（確保目前位於 `fabric-example-mod` 目錄下）執行：
     ```sh
     ./gradlew genIntelliJRuns
     ```

## 4. 安裝 IntelliJ IDEA（免費版）

1. **下載並安裝 IDEA**：
   - 進入 [IntelliJ IDEA 官網](https://www.jetbrains.com/idea/download/)。
   - 下載 `Community`（免費版）。
   - 執行 `.exe` 安裝程式，選擇 **JetBrains Runtime** 作為預設 JDK。

## 5. 總結

- **JDK 21**（Microsoft）：提供 OpenGL 支援。
- **JetBrains Runtime（DCEVM）**：允許熱加載。
- **Fabric 開發環境**：用於 Minecraft Mod 開發。
- **IntelliJ IDEA（免費版）**：作為開發工具。

到這裡，你的環境就準備好了！🚀