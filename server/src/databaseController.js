import fs from "fs"; // node.js에 있는 file system 메서드들이 모여 있는 라이브러리
import { resolve } from "path"; // 경로 설정을 수정하기 위한 역할

const basePath = resolve(); // 현재에 있는 경로를 basePath 변수에 할당.

const fileNames = {
  messages: resolve(basePath, "src/database/messages.json"),
  users: resolve(basePath, "src/database/users.json"),
};

export const readDB = (target) => {
  // messages or users을 선택하기 위해서 인자로, target에서 정한다.
  try {
    // readFileSync의 두번째 인자로 인코딩을 반드시 명시해야한다.
    return JSON.parse(fs.readFileSync(fileNames[target], "utf-8"));
  } catch (err) {
    console.log(err);
  }
};

export const writeDb = (target, data) => {
  // 인자로, target뿐만 아니라, 새로 덮어씌울 data도 가져온다.
  try {
    // writeFileSync의 두번째 인자로, 덮어 씌울 데이터를 넣어준다.
    return fs.writeFileSync(fileNames[target], JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
