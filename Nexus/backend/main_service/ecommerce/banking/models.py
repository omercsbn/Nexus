from django.db import models

class BankAccount(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    account_number = models.CharField(max_length=20)
    bank_name = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.bank_name} - {self.account_number}"