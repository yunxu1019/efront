var steps = [
    refilm`-我的基本信息
  昵称 input
  英文名
  出生日期 date
  生肖 animal
  血型 blood
  身高 input
  体重
  `,
    refilm`-我的理想信念
  座右铭 text
  我最大的愿望 
  我的人生标杆（榜样）
  我的理想职业
  `,
    refilm`-我的自我认知
  我最大的优点 text
  我最大的缺点
  `,
    refilm`-我的兴趣爱好
  我最擅长的事情 text
  我最出色的本领
  我最喜欢的运动
  我最喜欢的音乐
  我最喜欢的乐器
  我最喜欢的书籍
  我最喜欢的颜色
  我最喜欢的食物
  我最喜欢的活动
  `,
    refilm`-我的雷区警示
  我最讨厌的事情 text
  我最害怕的事情
  我最反感的人物
  我的其他雷区警示
  `,
    refilm`-我最喜欢的家庭合照
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
    index: 0,
};
function main() {
    var page = div();
    page.innerHTML = refilm_test;
    renderWithDefaults(page, scope);
    return page;
}