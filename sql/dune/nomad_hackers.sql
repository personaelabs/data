select
  distinct tmp.from
from
  (
    select
      *,
      encode(ethereum.transactions.data, 'escape') as encode
    from
      ethereum.transactions
    where
      ethereum.transactions.to = '\x5D94309E5a0090b165FA4181519701637B6DAEBA' --   and ethereum.transactions.data = '\x928bc4b2'
      and block_time > NOW() - interval '8 hour' 
      and block_number < 15260202
    order by
      block_number asc
  ) as tmp
where
  encode LIKE '\\222\\213\\304\\262%' AND success = true