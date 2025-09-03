from django.http import JsonResponse

def index(request):
    """Пример представления для приложения chef."""
    data = {
        "message": "Привет из Chef!"
    }
    return JsonResponse(data)
