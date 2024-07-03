const base64 = Buffer.from('CrewFlute:ClimpFlee').toString('base64');


export type SuspendedBatchesData = {
  batchId: number
  suspensionEffectDt: string
  suspensionFollowDt: string
  accountNo: number
  wasteUnit: number
}

export const SendSuspendEmail = async (
  from,
  to,
  suspendedBatchesList,
) => {
  try {
    const html1 = `
    <div>
      <p>The following suspensions are within one week of expiration or beyond the expiration date. </p><br/>`
    let html2 = ``
	   suspendedBatchesList.forEach(suspendedBatches => {
              
	  html2 +=  
      `<p>Batch Id: ${suspendedBatches?.batchId} </p>
      <p>Account Number: ${suspendedBatches?.accountNo}</p>
      <p>Suspension Effect Date: ${suspendedBatches?.suspensionEffectDt}</p>
      <p>Suspension Follow Date: ${suspendedBatches?.suspensionFollowDt}</p>
      <p>Waste Unit: ${suspendedBatches?.wasteUnit}</p>
      <br/>`
            
       
              
              })
    const html3 = `</div> `
    const html = html1 + html2 + html3
    const response = await fetch('https://postdrop.aacounty.org/email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64}`,
      },
      body: JSON.stringify({
        from: from,
        to: to,
        subject: `DPW - Suspension Expiration Email Report`,
        html:html
              })})
            const  result = response.status
            return result }catch(error){console.log(error)}};
