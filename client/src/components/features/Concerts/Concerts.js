import React from 'react';

import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    {concerts.map(con => <Concert key={con.concert.id} {...con.concert} tickets={con.tickets}/>)}
  </section>
)

export default Concerts;