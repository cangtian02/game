/**
 * 资源加载
 * 支持单个或多个资源组加载
 * 参考 http://www.cnblogs.com/gamedaybyday/p/6079694.html
 */
class ResUtils extends Single {
    /**保存资源组名*/
    private groups: any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        
        this.groups = {};

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    }

    /**
     * 加载资源组，静默加载(无回调函数)
     * @group 资源组(支持字符串和数组)
     */
    public loadGroupQuiet(group) {
        var groupName: string = this.combGroupName(group);
        RES.loadGroup(groupName);
    }

    /**
     * 加载资源组，带加载完成回调
     * @group 资源组(支持字符串和数组)
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     * @priority 优先级
     */
    public loadGroup(group,onComplete: Function,thisObject: any,priority: number = 1) {
        var groupName: string = this.combGroupName(group);
        this.groups[groupName] = [onComplete,null,thisObject];
        RES.loadGroup(groupName);
    }


    /**
     * 加载资源组，带加载进度
     * @group 资源组(支持字符串和数组)
     * @onComplete 加载完成回调
     * @onProgress 加载进度回调
     * @thisObject 回调执行对象
     */
    public loadGroupWithPro(group,onComplete: Function,onProgress: Function,thisObject: any): void {
        var groupName: string = this.combGroupName(group);
        this.groups[groupName] = [onComplete,onProgress,thisObject];
        RES.loadGroup(groupName);
    }


    /**
     * 组合资源组名。单个资源组直接返回。多个资源组则重新命名。
     * @group 新资源组名
     */
    private combGroupName(group) {
        if (typeof (group) == "string") {
            return group;
        } else {
            var len = group.length;
            var groupName: string = "";
            for (var i = 0;i < len;i++) {
                groupName += group[i];
            }
            RES.createGroup(groupName,group,false); //是否覆盖已经存在的同名资源组,默认 false
            return groupName;
        }
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        console.log("资源组加载完成:" + groupName);
        if (this.groups[groupName]) {
            var loadComplete: Function = this.groups[groupName][0];
            var loadCompleteTarget: any = this.groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }

            this.groups[groupName] = null;
            delete this.groups[groupName];
        }
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        if (this.groups[groupName]) {
            var loadProgress: Function = this.groups[groupName][1];
            var loadProgressTarget: any = this.groups[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget,event);
            }
        }
    }

    /**
     * 资源组加载失败
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.log(event.groupName + "资源组有资源加载失败");
        this.onResourceLoadComplete(event);
    }
}

//使用方式
//var res: ResUtils = ResUtils.getInstance();
//res.loadGroupQuiet(["preload","login"]);
//res.loadGroupQuiet("login");
//res.loadGroup("login", ()=>{ console.log("login load complete")}, this);
//res.loadGroupWithPro("login", ()=>{console.log("login load complete")}, (e:RES.ResourceEvent)=>{console.log("login progress",e.itemsLoaded,e.itemsTotal)},this);
