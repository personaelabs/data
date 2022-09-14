
import pandas as pd
import numpy as np

etherscan_data = "export-0x00000000219ab540356cbb839cbe05303d7705fa.csv"
oa_data = "OA_List.csv"
df = pd.read_csv(etherscan_data, sep=',')
df_2 = pd.read_csv(oa_data, sep=',')

print(df.columns)
print(df.describe())
print(df.tail(5))
print("-----------------")
print(len(df))

df = df[df['Value_IN'] >= 32]
df = df[df['Method'] == 'Deposit']
df = df[df['Status'] != 'Error(0)']

df = pd.DataFrame(df['From'].unique(), columns=['From'])

print(df)
print(len(df))

df.to_csv('etherscan_filtered.csv', index=False)

diff_df = pd.merge(df, df_2, how='outer', indicator='Exist')

diff_df = diff_df.loc[diff_df['Exist'] != 'both']

diff_df.to_csv('diff_list.csv')