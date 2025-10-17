// 寵物類型
enum PetType {
  Dog = 1, // 狗
  Cat = 2, // 貓
}

// 寵物性別
enum PetGenderType {
  Male = 1, //男生
  Female = 2, //女生
  Unknown = 3, //不清楚
}

enum GrowthStatus {
  Baby = 1, // 小寶包
  Teen = 2, // 小搗蛋
  Adult = 3, // 黏黏寶
  Senior = 4, // 想陪你很久
}

enum NeuteredType {
  Neutered = 1, // 已結紮
  NotNeutered = 2, // 未結紮
  Unknown = 3, // 不清楚
}

type PetInfo = {
  name: string; // 寵物名稱
  petType: PetType; // 寵物類型: 1 = Dog, 2 = Cat
  breed: string | null; // 寵物品種
  genderType: PetGenderType; // 寵物性別: 1 = 男生, 2 = 女生, 3 = 不清楚
  neuteredType: NeuteredType; // 結紮狀態 : 1 = 已結紮, 2 = 未結紮, 3 = 不清楚
  growthStatus: GrowthStatus | null; // 成長階段 : 1 = 小寶包, 2 = 小搗蛋, 3 = 黏黏寶, 4 = 想陪你很久
};

export { PetType, PetGenderType, GrowthStatus, NeuteredType, PetInfo };
