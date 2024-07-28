from django.db import models

class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product = models.ForeignKey('catalog.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"Order {self.id} - {self.product.name}"
