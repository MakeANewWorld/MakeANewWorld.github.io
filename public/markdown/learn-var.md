如何玩Minecraft? Minecraft基本操作

首先，我們先把程式碼**恢復**成這樣  
![normal_code](images/learn-var/normal_code.png)

然後**展開左邊**的資料夾成這樣  
![left_folder](images/learn-var/left_folder.png)

打開`ExampleMixin`，**全選並貼上**:  
```java
package com.example.mixin;

import com.example.ExampleMod;
import net.minecraft.entity.LivingEntity;
import net.minecraft.entity.player.PlayerEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(LivingEntity.class)
public class ExampleMixin {
    @Inject(at = @At("HEAD"), method = "getHealth", cancellable = true)
    private void init(CallbackInfoReturnable<Float> cir) {
		LivingEntity entity = (LivingEntity) (Object) this;
		if (entity instanceof PlayerEntity player) {
			cir.setReturnValue(ExampleMod.getHealth(player));
		}
    }
}
```

然後切換回`ExampleMod`，在**最後一個括號之前**(之後我會簡稱**類的底部**)加上:  
```java
public static float getHealth(PlayerEntity entity) {
	return 1;
}
```

然後**啟動遊戲**(debug模式)  
![minecraft](images/learn-var/minecraft.png)

點`Language`按鈕，往下捲動到底部  
![languages](images/learn-var/languages.png)

按兩下`繁體中文 (台灣)`  
![bottom_languages](images/learn-var/bottom_languages.png)

會出現:  
![mojang](images/learn-var/mojang.png)

然後點`繼續`  
![continue](images/learn-var/continue.png)

然後按`單人遊戲`  
![sign_player](images/learn-var/sign_player.png)

然後按`允許指令`  
![allow_command](images/learn-var/allow_command.png)

然後按上面的`世界`  
![world](images/learn-var/world.png)

按一下`世界類型`，會變成超平坦  
![world_type](images/learn-var/world_type.png)

然後按一下上面的`更多`  
![more_tab](images/learn-var/more_tab.png)

按一下`遊戲規則`  
![game_rule](images/learn-var/game_rule.png)

捲動到`生成`  
![spawn](images/learn-var/spawn.png)

全部關閉  
![close_spawn](images/learn-var/close_spawn.png)

按`完成`  
![finish](images/learn-var/finish.png)

按`建立新的世界`  
![create_new_world](images/learn-var/create_new_world.png)

僅入世界後，你會看到你只剩半格`血量`  
![half_block_health](images/learn-var/half_block_health.png)

`血量`顧名思義就是你在被**怪物打**，或是**摔傷**、**過於飢餓**、被**沙子活埋**、被**玩家攻擊**...時會**減少**。  
當然透過**食物**或者**恢復藥水**可以將血量**恢復**，也可以用`指令`來恢復血量。  
`指令`類似於官方的**外掛**，就是可以對遊戲進行**直接操作**，例如**設定血量**為某個值、**瞬間殺死**血量很高的怪物、**設定天氣**、**召喚怪物**...。  

那旁邊的就是`飽食度`  
![hungry_level](images/learn-var/hungry_level.png)

`飽食度`顧名思義就是吃飽的程度，當**吃很飽**的時候可以`恢復血量`。  
當**餓太久**的時候會扣除`血量`。  
吃食物可以**補充**`飽食度`，**跑步**、**跳躍**、**破壞方塊**會**消耗**`飽食度`。  

我們可以用`esc`暫停遊戲把滑鼠叫出來。  
![pause_screen](images/learn-var/pause_screen.png)

用`W`**前進**、用`A`**往左**，用`D`**往右**，用`S`**後退**。  
用`F5`**切換視角**，用`滑鼠`**轉頭**。  
用`空白鍵`**跳躍**。  

`轉向`(之後會講`看向`)地面，按住`滑鼠左鍵`**破壞方塊**。  
![break_block](images/learn-var/break_block.png)

**破壞成功**會有`粒子`效果，並且會`掉落`方塊。  
![dirt_block](images/learn-var/dirt_block.png)

如果玩家離方塊很近，那玩家就會**自動撿起**方塊。  
手上就會有`泥土方塊`。  
![pick_dirt_block](images/learn-var/pick_dirt_block.png)

現在單按`W`鍵(之後會簡稱`前進`)是沒辦法出來的，我們要按住`W`，並且按下空白鍵(之後會簡稱`跳躍`)。  
![get_out](images/learn-var/get_out.png)

現在對著地面任意一處，按下`滑鼠右鍵`**放置方塊**。  
![place_block](images/learn-var/place_block.png)

同樣的，你今天學會了`Minecraft`的**基本操作**，並且使用了一點程式碼。
可以自己玩玩喔，死掉也沒關係，另外記得滑到頁面最底部，**領取積分**喔!