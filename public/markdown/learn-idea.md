# 讓電腦說話

你現在開啟的這個軟體叫做**IDEA**，是個Java**程式碼編輯器**。  
這個東西亂點**電腦也不會壞掉**，不過可能要重新設定:D  
不多廢話，讓我們先點開**左邊的資料夾**成下面這樣。  
**Tip**:要點開的話只要**按一下**，左邊的功能就是檔案總管而已。  
![folders](images/learn-idea/folders.png)

然後我們點開`ExampleMod`那個檔案，右邊會長這樣，我們稱右邊為**編輯器**。  
![java](images/learn-idea/java.png)

![elephant_logo](images/learn-idea/elephant_logo.png)
然後我們點擊**右上角**的這個圖案。  

像打開資料夾一樣，展開到`runClient`，我們稱這些具有設定圖標的"檔案"為**任務**。  
![gradle_tasks.png](images/learn-idea/gradle_tasks.png)

然後點兩下`runClient`(執行客戶端)，也就是跑Minecraft，你會發現右上角多出幾個東西。  
![process_control](images/learn-idea/process_control.png)

**綠色**的是`重新跑`一次Minecraft。  
**紅色**的是`停止`Minecraft用的。  

然後你也會發現**右下角**開始出現一些文字，這些是電腦對你說的話，我們稱作`log`(日誌)，也可說是`output`(電腦輸出)，有時也會說是`print`(列印)。  
![log](images/learn-idea/log.png)

然後你點一下那個都是文字的區域，我們稱做**控制台**，裡面一樣可以選中、複製，但通常是**不能**貼上、輸入的，除非電腦問你事情(`input`)。  
按下`Ctrl+F`，會出現搜尋框，在裡面輸入:`Hello Fabric world!`，就可以快速找到那行輸出。  
![find_log](images/learn-idea/find_log.png)

然後你就會發現一件神奇的事!編輯器裡面的文字**和電腦說的話對應上**了!  
也許可以嘗試**改改看**內容...?  
![error_string](images/learn-idea/error_string.png)

然後就**炸了**，這是為什麼呢?  
因為**電腦讀不懂**你在寫什麼，程式語言就**像英文**一樣，會有規定的**文法**。  
用來讓電腦知道這是一串"字"的時候，我們會用`""`包起來。因此上面這段就會出錯。  
因為**只有一段有包**起來，而另一段沒有包起來。  
這時候你一定想說:那`"`符號如何寫在文字內? 我被限制言論自由了嗎?  
不。這種時候我們加一個`\`號在`"`前面，電腦會把那兩個字看成一個`"`，但是忽略他包裝起來的**功能**。  
![fixed_error](images/learn-idea/fixed_error.png)

然後這時候點**綠色按鈕**重新開啟，再按下`停止並重新執行`，Minecraft就會重新啟動，你就會發現，**電腦說的話變了**!  
![change_code](images/learn-idea/change_code.png)

我知道你這時候會想說:想讓電腦說別句話都這麼困難，之後**不得麻煩死**?  
這時候我們就得想一下，程式給電腦跑，電腦**只跑一次**，跑完即便我**改了並替換了**正在執行的程式碼，我也看不到結果(**電腦不會說第二次**)。  
所以我們可以用下面的程式碼來讓電腦一直說，你現在先不需要了解這是什麼(**這很難**)，你只需要把**那一行**讓電腦講話的東西換成我這個程式碼就好了。  
**Tip**:程式碼框右上角有一個複製按鈕。  
```java
new Thread(() -> {
   while(true) {
      LOGGER.info(getMessage());
      synchronized (Thread.currentThread()) {
         try {
            Thread.sleep(3000);
         } catch (InterruptedException e) {
            throw new RuntimeException(e);
         }
      }
   }
}).start();
```
然後在**最後一個大括號之前**加上
```java
private static String getMessage() {
	return "Hello World!";
}
```
替換完後會長這樣:  
![new_method](images/learn-idea/new_method.png)

這次先停止(**紅色那顆按鈕**點下去)，大概率會像下面這樣，因為已經`cancelled`(取消)執行了，所以程式執行是**不正常結束**的。  
![control_error](images/learn-idea/control_error.png)

然後我們點**中間那隻蟲**，也是執行。  
它的功用是讓Minecraft的程式碼可以被**暫停**、一步一步看哪裡有**問題**、甚至**替換程式碼**...。  
我們稱做`除錯`(排除錯誤，也叫`Debug`)模式。  
跑下去，你會發現沒有什麼差別，因為其實只是**增加除錯功能**，卻並不干擾程式邏輯。  
你會看到從剛剛的要找，到現在變成**3秒就有一則訊息**。  
這是因為剛剛上面的程式碼設定了3000(毫秒)，所以每列印一段文字就會**休息3000毫秒**(3秒)。  
![texts](images/learn-idea/texts.png)

接下來我們可以把上面那串`Hello World`改成`Hello Fabric`，你會發現沒有變化，但是請**不要重開**。  
![change_text](images/learn-idea/change_text.png)

接下來在那行尾端點**右鍵**，點`編譯並重新加載文件`。  
![reload_file](images/learn-idea/reload_file.png)

你會看到有一個**對話框**跳出來:  
![pop_msg](images/learn-idea/pop_msg.png)

然後電腦說的話就變**不一樣**了!  
![ok](images/learn-idea/ok.png)

## 總結
到這邊你大概學會了IDEA的**基本用法**，後面會學到更多，如果你有時間也可以**自己摸索**看看。  
>**亂設定的話請自己處理喔!**  
---

📌 **小提醒：**

**滑到最下面，打開左上角的任務列表，領取點數！**

> 點數可以在以後購買更多有趣的任務喔！