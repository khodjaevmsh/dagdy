PICKUP = 'pickup'
DELIVERY = 'delivery'

DELIVERY_TYPES = (
    (PICKUP, 'Самовывоз'),
    (DELIVERY, 'Доставка'),
)


def get_delivery_default():
    return [PICKUP, DELIVERY]
