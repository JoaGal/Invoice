function sortData(invoices, items) {
    // Sort invoices by idUser
    const sortedInvoices = invoices.sort((a, b) => a.idUser - b.idUser);
  
    // Sort items by idInvoice
    const sortedItems = items.sort((a, b) => a.idInvoice - b.idInvoice);
  
    // Group items by idInvoice
    const itemsByInvoice = sortedItems.reduce((acc, item) => {
      if (!acc[item.idInvoice]) {
        acc[item.idInvoice] = [];
      }
      acc[item.idInvoice].push(item);
      return acc;
    }, {});
  
    // Combine sorted invoices with their corresponding sorted items
    const combinedData = sortedInvoices.map(invoice => ({
      ...invoice,
      items: itemsByInvoice[invoice.id] || []
    }));
  
    return combinedData;
  }

  export default sortData