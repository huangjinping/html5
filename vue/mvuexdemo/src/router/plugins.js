/**
 * Created by harrishuang on 2019/4/11.
 */
const Plugin1 = {
  install(a, b, c) {
    console.log('Plugin1 第一个参数:', a);
    console.log('Plugin1 第二个参数:', b);
    console.log('Plugin1 第三个参数:', c);
    console.log("========================>>>>>");
    console.log(this);
    console.log("========================>>>>>");

  },
};

function Plugin2(a, b, c) {
  console.log('Plugin2 第一个参数:', a);
  console.log('Plugin2 第二个参数:', b);
  console.log('Plugin2 第三个参数:', c);

  console.log("====111====================>>>>>");
  console.log(this);
  console.log("=====111===================>>>>>");
}

export { Plugin1, Plugin2 };
