往右邊轉時血量會上升? 往左邊轉就死了? 玩家血量之基本數學

接下來讓我們來想辦法**恢復**玩家的`血量`。  
但是我們使用**程式碼**來恢復。  
首先你應該會很輕易地就看到`1`這個數字。  
![number_1](images/learn-var-2/number_1.png)

不用想也知道，他就是**罪魁禍首**。  
我們知道，玩家的血量有`10`顆心，而`1`剩下**半顆**。  
所以玩家的實際上血量就是$10\times2=20$。  
我們同樣可以改成10然後**重新載入程式碼**。  
![reload_health](images/learn-var-2/reload_health.png)

然後再次進入就會發現，玩家的`血量`恢復成**一半**了!  
![half_health](images/learn-var-2/half_health.png)

那改成`20`呢? **回滿**了耶!  
![20_health](images/learn-var-2/20_health.png)

那改成`30`呢? **超出來了**耶! 真好玩。  
![30_health](images/learn-var-2/30_health.png)

接下來我們來做一個好玩的功能，把`20.0`的血量加上玩家頭旋轉$360.0^\circ\times n$圈(從名字看是這個)  
改完要記得**重新載入**!  
```java
float headYaw = entity.getHeadYaw();
float health = 20;
return health + headYaw;
```

然後你就會發現往**右轉**會一直**增加**血量。  
![right_head](images/learn-var-2/right_head.png)

往**左轉**就有可能會**死**(血量小於於或等於`0`)。  
![left_dead](images/learn-var-2/left_dead.png)

重生的話就是`20.0`，因為$360.0^\circ\times 0=0$圈  
![respawn](images/learn-var-2/respawn.png)  
那  
```java
float health = 20;
```
代表什麼呢?   
`float`是**浮點數**的意思，就是用來表示`小數、整數、負數`，其實我們應該用**更好的寫法:**  
```java
float health = 20.0F;
```
`F`的作用是讓電腦知道這是`float類型`的資料，因為還有`double`類型的。  
`double`類型，顧名思義就是`double(雙倍)`的小數位數，可以用來儲存比float多的資料。  
而如果你這樣寫:  
```java
float health = 20.0;
```
會不能執行，因為電腦**預設小數為double**，使用float可能只是為了**節省記憶體**(因為電腦儲存的資料比較少，用較少的空間)。  
通常我們的**習慣**還是會在double後面加上`D`，像下面這樣:  
```java
double a = 1.0D;
```
也許聰明的你已經發現了，我們還有一個東西:`名字`，我們要在電腦裡面**儲存資料**的時候會用`類型 名字 = 值;`的形式去儲存。  
名字**沒有意義**，只是方便你**操作資料** (`取出` or `放入`)。  
所以我們也可以這樣寫:  
```java
float a = entity.getHeadYaw();
float b = 20.0F;
return a + b;
```
~~(一股數學味)~~，寫程式的時候**非常不建議**這樣寫，會導致之後要改程式碼**很麻煩**。  
我現在想要把`headYaw`的影響**調整小**，但是現在還不知道`headYaw`是甚麼值。  
還記得剛開始的`LOGGER`嗎? **印出來**我們就會知道是甚麼了!  
先印出來(記得改好**重新載入**):  
```java
public static float getHealth(PlayerEntity entity) {
	float headYaw = entity.getHeadYaw();
	float health = 20.0F;
  LOGGER.info("headYaw: {}", headYaw);
	return health + headYaw;
}
```
![dead+angle](images/learn-var-2/dead+angle.png)  
先死一次，發現是$-30^\circ$，**重生**，滑鼠不動。  
![respawn+angle](images/learn-var-2/respawn+angle.png)  
是$0^\circ$耶，讓我們把**頭轉一圈**?  
![360angle](images/learn-var-2/360angle.png)  
是$360^\circ$耶，所以果然是$360.0^\circ\times n$圈耶!
那讓我們把`headYaw`除以360.0F:
```java
float turns = entity.getHeadYaw() / 360.0F;
```
然後把20.0**乘以圈數**:
```java
return health * turns;
```
最後會長這樣:
```java
float turns = entity.getHeadYaw() / 360.0F;
float health = 20.0F;
return health * turns;
```
從上面就知道，電腦中的`加`就是`+`，`減`就是`-`。  
`乘法`變成`*`，`除法`變成`/`。  
重新載入，測試一下:  
![test_change_code](images/learn-var-2/test_change_code.png)  
成功了! 這時候我又想說，如果他是`400`度，就要乘以`1.~`，那會**浪費40度**耶，我想把**剩下的角度除以十**然後直接**加上去**血量。  
但是我發現一個問題，除法**直接除盡**的話好像是沒有**取餘數**這個東西的。  
於是，我們就要請出我們的`%`符號!  
他專們用來取出除法的**餘數**，所以我們可以這樣寫:  
```java
float headYaw = entity.getHeadYaw();
float leftoverYaw = headYaw % 360.0F;
```
然後**除以十**:  
```java
float headYaw = entity.getHeadYaw();
float leftoverYaw = headYaw % 360.0F;
float divide10 = leftoverYaw / 10;
```
但是這樣**好麻煩**，`leftoverYaw`之後又用不到，那這樣寫呢?   
```java
float headYaw = entity.getHeadYaw();
float leftoverYawDivide10 = headYaw % 360.0F / 10;
```
照理來說會是從左到右，可是**太不清楚**了吧，萬一我看成`headYaw % 36.0F`呢?  
這種時候我們可以用**括號**:  
```java
float headYaw = entity.getHeadYaw();
float leftoverYawDivide10 = (headYaw % 360.0F) / 10;
```
然後，我又想說，`health`之後用不到，不如給他一個新的值?  
```java
health *= headYaw / 360.0F;
```
這樣其實就是:  
```java
health = health * (headYaw / 360.0F);
```
等於不是說他是相同的，是說給他一個新的值。
所以我們也可以得出一個結論，在Java當中，我們也可以對於這種形式做簡化: 
```java
a = a + b;
```
也就是
```java
a += b;
```
***
```java
a = a * b;
```
也就是
```java
a *= b;
```
***
```java
a = a - b;
```
也就是
```java
a -= b;
```
***
```java
a = a / b;
```
也就是
```java
a /= b;
```
***
```java
a = a % b;
```
也就是
```java
a %= b;
```
***
所以其實在Java當中`基本數學`是沒有**什麼變化**的，只不過**沒有**`大括號、中括號、小括號`**之分**，括號**永遠都用小括號**。  
喔對了，順便提一下，這種`類型 名字 = 值;`的寫法其實是這種寫法的簡化:  
```java
float a;
a = b;
```
就是把兩步驟變成一步驟的簡化。  
最後，因為如果重生後稍微動了一下，那血量會多1，所以我們還想減1。  
```java
health = health - 1;
```
喔，還可以寫成這樣:  
```java
health--;
```
同理，如果想加一:  
```java
health = health + 1;
```
也可以寫成這樣:  
```java
health++;
```
不過要注意順序在這裡雖然沒有差異，但其實如果是`health++`會先給出`health`，然後對`health`執行設定+1的操作。  
如果是`++health`，會先對`health`執行設定+1的操作，然後再給出`health`。  
我們來看一段範例:  
```java
float a = 1.0F;
float b = a++;
```
a是2，b是1，因為先給出了a，然後設定a為a+1。  
```java
float a = 1.0F;
float b = ++a;
```
a是2，b是2，因為先設定a為a+1，然後才給出了a。  
最後我們的程式碼會長成這樣:  
```java
float headYaw = entity.getHeadYaw();
float leftoverYawDivide10 = (headYaw % 360.0F) / 10;
float health = 20.0F;
health *= headYaw / 360.0F;
return health + leftoverYawDivide10;
```
會發現，每轉一圈就會有一排血量被消掉，那是因為`leftoverYawDivide10`重新變成0。  

同樣的，你今天學會了`Java`的**基本數學**，並且使用了一點程式碼。
可以自己玩玩喔，另外記得滑到頁面最底部，**領取積分**喔!