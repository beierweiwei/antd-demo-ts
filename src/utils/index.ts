interface Cate extends ProductCate{
  children?: Cate[]
}
type CateTree = Cate[]
export const createCateTree = (cateList: ProductCate[]): CateTree  => {
  const res:CateTree = []
  cateList.forEach((cate: Cate) => {
    findParent(cate, cateList)
  })
  return res
  function findParent(cate: Cate, allCate: ProductCate[]) {
    if (cate.pid) {
      const pCate = (allCate.find((pcate: Cate) => cate.pid === pcate._id) as Cate)
      pCate.children = pCate.children || []
      pCate.children.push(cate)
    } else {
      res.push(cate)
    }
  }
}