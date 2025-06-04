from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product, Order, Payment


class ProductAPITestCase(APITestCase):
    def test_create_and_list_products(self):
        url = reverse('product-list')
        data = {
            'name': 'Phone',
            'description': 'Smart phone',
            'price': '99.99',
            'stock': 10,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class OrderPaymentAPITestCase(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name='Tablet',
            description='Android tablet',
            price='150.00',
            stock=5,
        )

    def test_order_and_payment_flow(self):
        order_url = reverse('order-list')
        order_data = {
            'product': self.product.id,
            'quantity': 2,
            'total_price': '300.00',
        }
        order_resp = self.client.post(order_url, order_data, format='json')
        self.assertEqual(order_resp.status_code, status.HTTP_201_CREATED)
        order_id = order_resp.data['id']

        payment_url = reverse('payment-list')
        payment_data = {
            'order': order_id,
            'amount': '300.00',
        }
        payment_resp = self.client.post(payment_url, payment_data, format='json')
        self.assertEqual(payment_resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Payment.objects.count(), 1)

