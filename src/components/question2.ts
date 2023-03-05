// briggs: EI, SN, TF, JP
// color: brown, green, blue, red
// letter: a, b, c, d
var question2 = [
  // question #1
  `#include <stdio.h>
 
      int main()
      {
          int original_number = 12321;
          int reversed = 0;
        
          int num = original_number;
          while (num != 0)
          {
              int r = num % 10;
              reversed = reversed * 10 + r;
              num /= 10;
          }
          if (original_number == reversed)
          {
              printf(" Given number %d is a palindrome number", original_number);
          }
          else
          {
              printf(" Given number %d is not a palindrome number", original_number);
          }
          return 0;
      }
`,
  // question #2
  `#include <stdio.h>
      void main()
      {
          int num, rem, sum = 0, i;
          printf("Enter a number\n");
          scanf("%d", &num);
          for (i = 1; i < num; i++)
          {
              rem = num % i;
              if (rem == 0)
              {
                  sum = sum + i;
              }
          }
          if (sum == num)
              printf(" %d is a Perfect Number", num);
          else
              printf("\n %d is not a Perfect Number", num);
      }

  `,
  // question #3
  `
    #include <stdio.h>

    int fact(int r)
    {
        int mul = 1;
        for (int i = 1; i <= r; i++)
        {
            mul = mul * i;
        }
        return mul;
    }

    int main()
    {
        int n;
        int sum = 0;
        printf("Enter a number");
        scanf("%d", &n);
        int k = n;
        int r;
        while (k != 0)
        {
            r = k % 10;
            int f = fact(r);
            k = k / 10;
            sum = sum + f;
        }
        if (sum == n)
        {
            printf("\n %d is a strong number");
        }
        else
        {
            printf("\n %d is not a strong number");
        }
        return 0;
    }

  `,
  // question #4
  `#include <stdio.h>

      int PrimeorNot(int, int);
      void main()
      {

          int num, prime;

          printf("Enter a positive number to check Prime or Not: ");
          scanf("%d", &num);

          prime = PrimeorNot(num, num / 2);

          if (prime == 1)
          {
              printf("%d is a prime number\n", num);
          }
          else
          {
              printf("%d is a not a prime number\n", num);
          }
      }

      int PrimeorNot(int n, int i)
      {
          if (i == 1)
              return 1;
          else
          {
              if (n % i == 0)
                  return 0;
              else
                  PrimeorNot(n, i - 1);
          }
      }

  `,
  // question #5
  `#include <stdio.h>
      int largest(int arr[], int n)
      {
          int i;
          int max = arr[0];
      
          for (i = 1; i < n; i++)
              if (arr[i] > max)
                  max = arr[i];
      
          return max;
      }
      
      int main()
      {
          int arr[] = {10, 324, 45, 90, 9808};
          int n = sizeof(arr)/sizeof(arr[0]);
          printf("Largest in given array is %d", largest(arr, n));
          return 0;
      }
`,
];

export default question2;
