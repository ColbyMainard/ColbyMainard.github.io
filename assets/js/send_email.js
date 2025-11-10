function send_email(){
    const my_email = 'colby.mainard@proton.me';
    const subject = 'Introducing Myself';
    const body = 'Hi Colby,\n\nI saw your website and wanted to reach out.\n\nBest,';
    window.open(`mailto:${my_email}?subject=${subject}&body=${body}`);
}