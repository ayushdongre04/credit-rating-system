from django.urls import path
from .views import MortgageListCreateView, MortgageDeleteView

urlpatterns = [
    path('mortgages/', MortgageListCreateView.as_view(), name='mortgage_list_create'),
    path('mortgages/<int:pk>/', MortgageDeleteView.as_view(), name='mortgage_delete'),
]
