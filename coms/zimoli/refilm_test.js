var steps = [
  refilm`- 基本信息
昵称/nick 36字/string //如：孝钦慈禧端佑康颐昭豫庄诚寿恭钦献崇熙配天兴圣显皇后
英文名/name 72byte/string
出生日期/birth date
生肖/animal 1byte/select 鼠牛虎兔龙蛇马羊猴鸡狗猪
血型/blood 1byte/select ABA\BO
身高/sg input
体重/tz
  `,
  refilm`-理想信念
座右铭/zym text
最大愿望/zdlx 
人生标杆（榜样）/by
理想职业/lx
  `,
  refilm`-自认知
最大优点/yd text
最大缺点/qd
  `,
  refilm`-兴趣爱好
最擅长事情/sc text
最出色本领/bl
最喜欢运动/yd
最喜欢音乐/yy
最喜欢乐器/yq
最喜欢书籍/sj
最喜欢颜色/ys
最喜欢食物/sw
最喜欢活动/hd
  `,
  refilm`-雷区警示
最讨厌事情/ty text
最害怕事情/hp
最反感人物/fg
其他雷区警示/lq
  `,
  refilm`-最喜欢的家庭合照
照片列表/photo image
  `,
];

var refilm_fields = refilm`
字段名/name string
键名/key
类型/type
大小/size
单位/unit
可选项/options
备注/comment
`

var scope = {
  prevStep() {
    if (this.index > 0) {
      this.index--;
    }
  },
  nextStep() {
    if (this.index + 1 < this.steps.length) {
      this.index++;
    }
  },
  refilms: refilm_fields,
  steps,
  refilm_encode,
  radio,
  data: {},
  index: 0,
};
var console = window.console;
function main() {
  var page = div();
  page.innerHTML = refilm_test;

  renderWithDefaults(page, scope);
  return page;
}