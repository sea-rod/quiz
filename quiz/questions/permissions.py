from rest_framework import permissions
from .models import QuestionBank


class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        obj = QuestionBank.objects.get(pk=request.data["question_bank"])

        return obj.user == request.user

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.question_bank.user == request.user


class IsQuizer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            print("jejee")
            return True

        return  obj.user.is_quizer and obj.user == request.user

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_authenticated and request.user.is_quizer
