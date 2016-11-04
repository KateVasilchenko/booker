export default { columns: [
  {
    label: 'Amount',
    valuePath: 'amount',
    sortable: false,
    cellComponent: 'my-cell'
  },
  {
    label: 'Description',
    valuePath: 'description',
    sortable: false,
    cellComponent: 'my-cell'
  },
  {
    label: 'Is Negative',
    valuePath: 'isNegative',
    sortable: false,
    cellComponent: 'my-cell'
  },
  {
    sortable: false,
    cellComponent: 'my-cell-actions'
  }
]};