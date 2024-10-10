from datetime import datetime

from banditsdk.http.web_result import WebResult

from settings import settings


def transaction_data_tg_aggregator(data: WebResult) -> any:
    data_to_aggregate = data.data
    time_pattern = "%d-%m-%y %a %H:%M:%S"
    to_telegram_data: str = f"""
<b>🧾 Поступил новый заказ</b>
    
<b>📋 Статус:</b> {data_to_aggregate.get("status")}
<b>🛒 Продукт:</b> {data_to_aggregate.get("description")}
<b>1️⃣ Номер транзакции:</b> {data_to_aggregate.get("transaction_id")}
<b>2️⃣ Внешний номер заказа:</b> {data_to_aggregate.get("payment_id")}
<b>3️⃣ Внутренний номер заказа:</b> {data_to_aggregate.get("order_id")}
<b>4️⃣ LiqPay номер:</b> {data_to_aggregate.get("liqpay_order_id")}
<b>💳 Номер карты:</b> {data_to_aggregate.get("sender_card_mask2")}
<b>💳 Тип карты:</b> {data_to_aggregate.get("sender_card_type")}
<b>💲 Сумма оплаты:</b> {data_to_aggregate.get("amount")}
<b>💲 Валюта:</b> {data_to_aggregate.get("currency")}
<b>➡️ Комиссия отправителя:</b> {data_to_aggregate.get("sender_commission")}
<b>⬅️ Комиссия получателя:</b> {data_to_aggregate.get("receiver_commission")}
<b>↘️ Комиссия агентсва:</b> {data_to_aggregate.get("agent_commission")}
<b>⬆️ Комиссия кредитная:</b> {data_to_aggregate.get("commission_credit")}
<b>⬇️ Комиссия дебитовая:</b> {data_to_aggregate.get("commission_debit")}
<b>🕒 Начало транзакции:</b> {datetime.fromtimestamp(data_to_aggregate.get("create_date") / 1000).strftime(time_pattern)}
<b>🕘 Конец транзакции:</b> {datetime.fromtimestamp(data_to_aggregate.get("end_date") / 1000).strftime(time_pattern)}
    
<b><a href="{settings.result_url}admin">Просмотреть заказ</a></b>
    """
    return to_telegram_data
