import "./InvoicePage.css";
function InvoicePage({ bill, items ,setPage}) {

  if (!bill) {
    return <h3>No Invoice Found</h3>;
  }

  return (
    <div className="container mt-4">
      <h6 style={{textAlign:"center"}}>"ॐ"</h6>
      <h3 className="text-center">
        TAX INVOICE
      </h3>

 <h5 style={{ textAlign: "right" }}>Date: {bill.billDate}
      </h5>
      <hr />

      {/* <p>
        <strong>Bill No:</strong> {bill.billId}
      </p> */}

      <table
  className="table"
  style={{
    width: "100%",
    tableLayout: "fixed"
  }}
>

        <thead>
  <tr>
    <th style={{ width: "15%" , textAlign: "center"}}>Brand</th>
    <th style={{ width: "15%", textAlign: "center" }}>Category</th>
    <th style={{ width: "10%" , textAlign: "center"}}>Size</th>
    <th style={{ width: "25%", textAlign: "center" }}>Product</th>
    <th style={{ width: "10%", textAlign: "center" }}>Qty</th>
    <th style={{ width: "12%" , textAlign: "center"}}>Rate</th>
    <th style={{ width: "13%", textAlign: "center" }}>Amount</th>
  </tr>
</thead>

        <tbody>

  {items.map(item => (
    <tr key={item.id}>
      <td style={{textAlign:"center"}}>{item.brand}</td>
      <td style={{textAlign:"center"}}>{item.category?.name}</td>
      <td style={{textAlign:"center"}}>{item.size}</td>
      <td style={{textAlign:"center"}}>{item.productName}</td>
      <td style={{textAlign:"center"}}>{item.quantity}</td>
      <td style={{textAlign:"center"}}>₹{item.price}</td>
      <td style={{textAlign:"center"}}>₹{item.amount}</td>
    </tr>
  ))}

</tbody>

      </table>

      <h4 className="text-end" style={{ textAlign: "center" }}>
        Total : ₹{bill.totalAmount}
      </h4>

      <button
        className="btn btn-success"
        onClick={() => window.print()}
      >
        Print Invoice
      </button> <br/> <br/>  
<button
  className="btn btn-primary mb-3"
  onClick={() => setPage("bill")}
>
  ← Back To Billing
</button>
</div>
    
  );
}

export default InvoicePage;