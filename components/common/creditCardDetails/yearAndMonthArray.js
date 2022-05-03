const min = new Date().getFullYear();
const yearsArrayParent = [...Array(100).keys()].map((item) => min + item);
const monthArrayParent = [
  { key: "Jan", value: "01" },
  { key: "Feb", value: "02" },
  { key: "Mar", value: "03" },
  { key: "Apr", value: "04" },
  { key: "May", value: "05" },
  { key: "June", value: "06" },
  { key: "July", value: "07" },
  { key: "Aug", value: "08" },
  { key: "Sept", value: "09" },
  { key: "Oct", value: "10" },
  { key: "Nov", value: "11" },
  { key: "Dec", value: "12" },
];

export { yearsArrayParent, monthArrayParent };
