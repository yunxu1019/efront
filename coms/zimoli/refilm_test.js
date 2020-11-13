var steps = [
    refilm`-基本信息
  昵称 input
  英文名
  出生日期 date
  生肖 animal
  血型 blood
  身高 input
  体重
  `,
    refilm`-理想信念
  座右铭 text
  最大愿望 
  人生标杆（榜样）
  理想职业
  `,
    refilm`-自认知
  最大优点 text
  最大缺点
  `,
    refilm`-兴趣爱好
  最擅长事情 text
  最出色本领
  最喜欢运动
  最喜欢音乐
  最喜欢乐器
  最喜欢书籍
  最喜欢颜色
  最喜欢食物
  最喜欢活动
  `,
    refilm`-雷区警示
  最讨厌事情 text
  最害怕事情
  最反感人物
  其他雷区警示
  `,
    refilm`-最喜欢的家庭合照
  照片列表 image
  `,
];

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
    steps,
    data: {},
    index: 0,
};
function main() {
    var page = div();
    page.innerHTML = refilm_test;
    renderWithDefaults(page, scope);
    return page;
}