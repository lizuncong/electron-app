## loadURL 方式会多出一个渲染进程

## 打开关闭窗口，内存没有释放

## window open 是能对性能最好的一种方式

不论 window open 打开多少个窗口，自始至终只有一个 render process。我们都知道，创建一个进程都是需要内存开销的。通过 new BrowserWindow 创建窗口会为每个窗口创建一个 render process 进程
