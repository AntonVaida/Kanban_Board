import { Issues } from "../types/Issues"

export const getUnicleIssue = (arr: Issues[]) => {
  const map = new Map();
  const resultArr:Issues[] = [];

  arr.forEach((issue) => {
    map.set(issue.id, issue)
  })

  map.forEach((value) => {
    resultArr.push(value)
  })

  return resultArr;
}