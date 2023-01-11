interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

let cats: Partial<Record<CatName, CatInfo>> | undefined = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  // mordred: { age: 16, breed: "British Shorthair" },
};


export default cats;